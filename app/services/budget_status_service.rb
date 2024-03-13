# frozen_string_literal: true

class BudgetStatusService
  def initialize(user, month, year)
    @user = user
    @month = month
    @year = year
  end

  def self.call(user, month, year)
    new(user, month, year).call
  end

  def call
    {
      current_month: current_month?,
      status: budget_status,
      current_budget:,
      total_budget:,
      total_expenses:,
      total_income:,
      exceeding_categories: format_categories,
      missing_budget_categories: user.categories.where(minimum_amount: 0).pluck(:name),
      graph_data: total_expenses_by_day,
      expenses_pie: expense_per_category,
      income_pie: income_per_source
    }
  end

  private

  attr_reader :user, :month, :year

  def total_expenses_by_day
    expenses_by_day = fetch_expenses_by_day
    running_total = BigDecimal('0')
    days_in_month.map do |day|
      running_total += BigDecimal(expenses_by_day[day] || '0')
      {
        date: I18n.l(day, format: '%-m/%-d'),
        total: (day > Time.zone.today ? nil : running_total.round(2).to_f),
        budget: (daily_budget * day.day).round(2).to_f
      }
    end
  end

  def fetch_expenses_by_day
    user.expenses
        .where("EXTRACT(MONTH FROM date) = ? AND EXTRACT(YEAR FROM date) = ?", month, year)
        .group("date")
        .sum(:amount)
        .transform_keys(&:to_date)
  end

  def days_in_month
    (Date.new(year, month, 1)..Date.new(year, month, -1))
  end

  def daily_budget
    BigDecimal(total_budget) / days_in_month.count
  end

  def current_month?
    month == Time.zone.today.month && year == Time.zone.today.year
  end

  def percent_of_month
    Time.zone.today.day / Time.zone.today.end_of_month.day.to_f
  end

  def total_budget
    @total_budget ||= user.total_budget(month, year)
  end

  def current_budget
    current_month? ? (BigDecimal(total_budget) * percent_of_month).to_f : total_budget
  end

  def total_expenses
    @total_expenses ||= user.total_expenses(month, year)
  end

  def total_income
    @total_income ||= user.total_income(month, year)
  end

  def budget_status
    total_expenses <= current_budget ? 'You are within your budget!' : 'You have exceeded your budget!'
  end

  def exceeding_categories
    @exceeding_categories ||= user.exceeding_categories(month, year)
  end

  def format_categories
    exceeding_categories.map do |category|
      monthly_expense = category.total_expense(month, year)
      min_amount = current_month? ? category.minimum_amount * percent_of_month : category.minimum_amount

      {
        name: category.name,
        total_expense: monthly_expense,
        minimum_amount: category.minimum_amount,
        overage: monthly_expense - min_amount
      }
    end
  end

  def expense_per_category
    user.categories.map do |category|
      total_expense = category.total_expense(month, year)
      next if total_expense.zero?
  
      {
        name: category.name,
        total_expense:
      }
    end.compact
  end

  def income_per_source
    user.income_sources.map do |source|
      total_income = source.total_income(month, year)
      next if total_income.zero?

      {
        name: source.name,
        total_income:
      }
    end.compact
  end
end
