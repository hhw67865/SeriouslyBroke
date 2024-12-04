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
      total_budget:,
      total_expenses:,
      total_income:,
      exceeding_categories: format_categories,
      missing_budget_categories: user.categories.where(minimum_amount: [0, nil]).pluck(:name),
      graph_data: total_expenses_by_day,
      expenses_pie: expense_per_category,
      income_pie: income_per_source
    }
  end

  private

  attr_reader :user, :month, :year

  def total_expenses_by_day
    expenses_by_day = fetch_expenses_by_day
    running_total = 0.0
    days_in_month.map do |day|
      expense = expenses_by_day[day] || 0
      running_total += expense
      {
        date: I18n.l(day, format: '%-m/%-d'),
        total: (day > Time.zone.today ? nil : running_total.round(2)),
        budget: total_budget.round(2)
      }
    end
  end
  
  def fetch_expenses_by_day
    start_date = Date.new(year, month, 1)
    end_date = start_date.end_of_month
  
    # Fetch daily and monthly expenses
    regular_expenses = user.expenses
                           .where(frequency: [0, 1])
                           .where(date: start_date..end_date)
                           .group(:date)
                           .sum(:amount)
  
    # Fetch and prorate annual expenses
    annual_expenses = user.expenses
                          .where(frequency: 2)
                          .where("date > ? AND date <= ?", end_date - 11.months, end_date)
                          .select('date, amount / 12.0 as prorated_amount')
  
    # Combine regular and prorated annual expenses
    combined_expenses = regular_expenses.to_h
  
    annual_expenses.each do |expense|
      expense_date = adjust_annual_expense_date(expense.date, start_date, end_date)
      combined_expenses[expense_date] ||= 0
      combined_expenses[expense_date] += expense.prorated_amount.to_f
    end
  
    combined_expenses.transform_keys(&:to_date)
  end

  def adjust_annual_expense_date(original_date, start_date, end_date)
    adjusted_date = Date.new(year, month, original_date.day)
    adjusted_date = end_date if adjusted_date > end_date
    adjusted_date
  rescue Date::Error
    # Handle invalid dates (e.g., February 30th)
    end_date
  end

  def days_in_month
    (Date.new(year, month, 1)..Date.new(year, month, -1))
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

  def total_expenses
    @total_expenses ||= user.total_expenses(month, year)
  end

  def total_income
    @total_income ||= user.total_income(month, year)
  end

  def budget_status
    total_expenses <= total_budget ? 'You are within your budget!' : 'You have exceeded your budget!'
  end

  def exceeding_categories
    @exceeding_categories ||= user.exceeding_categories(month, year)
  end

  def format_categories
    exceeding_categories.map do |category|
      monthly_expense = category.total_expenses(month, year)
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
      total_expense = category.total_expenses(month, year)
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
