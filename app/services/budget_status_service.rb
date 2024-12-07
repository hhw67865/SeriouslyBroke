# frozen_string_literal: true

class BudgetStatusService
  require 'net/http'
  require 'json'

  def initialize(user, month, year)
    @user = user
    @month = month
    @year = year
    @api_key = ENV['OPENAI_SECRET_KEY']
  end

  def self.call(user, month, year)
    new(user, month, year).call
  end

  def call
    budget_data = gather_budget_data
    overspending_analysis = analyze_overspending(budget_data)
    generate_summary(budget_data, overspending_analysis)
  end

  private

  attr_reader :user, :month, :year, :api_key

  def gather_budget_data
    current_month = Date.today.month == @month && Date.today.year == @year
    total_budget = user.total_budget(month, year)
    total_expenses = user.total_expenses(month, year)

    {
      month: Date::MONTHNAMES[@month],
      year: @year,
      current_month: current_month,
      total_budget: total_budget,
      total_expenses: total_expenses,
      budget_percentage_used: total_budget.positive? ? (total_expenses / total_budget * 100).round(2) : 0,
      month_progress: current_month ? (Date.today.day.to_f / Date.today.end_of_month.day * 100).round(2) : 100,
      category_summaries: gather_category_summaries(current_month)
    }
  end

  def gather_category_summaries(current_month)
    user.categories.map do |category|
      monthly_budget = category.minimum_amount
      current_expense = category.total_expenses(month, year)

      {
        name: category.name,
        budget: monthly_budget,
        expense: current_expense,
        percentage_used: monthly_budget.positive? ? (current_expense / monthly_budget * 100).round(2) : 0,
        over_budget: current_expense > monthly_budget
      }
    end
  end

  def analyze_overspending(budget_data)
    current_month = budget_data[:current_month]
    category_summaries = budget_data[:category_summaries]

    overspending_categories = category_summaries.select do |category|
      if current_month
        days_left_percentage = (100 - budget_data[:month_progress]).round(2)
        budget_left_percentage = (100 - category[:percentage_used]).round(2)
        budget_left_percentage < days_left_percentage
      else
        category[:over_budget]
      end
    end

    overspending_categories.map do |category|
      top_contributors = top_overspending_contributors(category[:name])
      {
        name: category[:name],
        percentage_used: category[:percentage_used],
        top_contributors: top_contributors
      }
    end
  end

  def top_overspending_contributors(category_name)
    expenses = user.expenses.where(
      category: user.categories.find_by(name: category_name),
      date: Date.new(year, month, 1)..Date.new(year, month, -1)
    ).order(amount: :desc).limit(3)

    expenses.reject { |e| e.frequency == 'monthly' }.map do |e|
      { description: e.name, amount: e.amount }
    end
  end

  def generate_summary(budget_data, overspending_analysis)
    uri = URI('https://api.openai.com/v1/chat/completions')
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(uri)
    request['Content-Type'] = 'application/json'
    request['Authorization'] = "Bearer #{api_key}"

    request.body = {
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful financial advisor providing concise budget summaries.' },
        { role: 'user', content: create_prompt(budget_data, overspending_analysis) }
      ],
      temperature: 0.2,
      max_tokens: 300
    }.to_json

    response = http.request(request)
    JSON.parse(response.body).dig('choices', 0, 'message', 'content')
  end

  def create_prompt(budget_data, overspending_analysis)
    if budget_data[:total_expenses].zero? && budget_data[:total_budget].zero?
      return "No expenses or budgets set. Please add expenses and set category budgets for analysis."
    end

    <<~PROMPT
      Provide a concise budget analysis for #{budget_data[:month]} #{budget_data[:year]}:

      ## Overall

      - Total Budget: $#{budget_data[:total_budget]}
      - Total Expenses: $#{budget_data[:total_expenses]}
      - Budget Used: #{budget_data[:budget_percentage_used]}%
      #{budget_data[:current_month] ? "- Month Progress: #{budget_data[:month_progress]}%" : ""}

      ## Overspending Analysis

      #{overspending_analysis.map do |category|
        "### #{category[:name]}: #{category[:percentage_used]}% used

        Top contributors:
        #{category[:top_contributors].map { |c| "- #{c[:description]}: $#{c[:amount]}" }.join("\n")}"
      end.join("\n\n")}

      Please provide:

      1. A brief overview of the budget status.
      2. #{budget_data[:current_month] ? "Analysis of categories at risk of overspending based on current progress." : "Analysis of categories that exceeded their budgets."}
      3. Insights from the top expenses contributing to overspending and their impact.

      For categories not mentioned in the overspending analysis, simply say "good job" if applicable.
      Keep the analysis brief and focused on overspending issues.
      Please keep the word count under 250 words.
      Use markdown formatting for better readability.
    PROMPT
  end
end
