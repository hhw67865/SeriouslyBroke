class CategoryStatusService

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
      month:,
      year:,
      current_month: Date.new(year, month, 1).strftime("%B %Y"),
      previous_month: Date.new(year, month, 1).prev_month.strftime("%B %Y"),
      categories: user.categories.order(:order).map do |category|
        {
          name: category.name,
          total_expenses: category.total_expenses(month, year),
          prev_total_expenses: category.total_expenses(month - 1, year),
          budget: category.minimum_amount,
        }
      end
    }
  end

  private

  attr_reader :user, :month, :year
end
