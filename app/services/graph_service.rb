class GraphService
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
      expenses_graph_data:,
      total_budget:,
      total_expenses:,
      total_income:
    }
  end

  private

  attr_reader :user, :month, :year

  def expenses_graph_data
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

  def total_budget
    @total_budget ||= user.total_budget(month, year)
  end

  def total_expenses
    @total_expenses ||= user.total_expenses(month, year)
  end

  def total_income
    @total_income ||= user.total_income(month, year)
  end


  # PIE CHART DATA TODO

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
