class YearlySummaryService
  def self.call(user)
    current_year = Date.current.year
    previous_year = current_year - 1

    expenses = calculate_expenses(user, current_year, previous_year)
    incomes = calculate_incomes(user, current_year, previous_year)

    {
      expenses: {
        categories: expenses[:categories],
        total: {
          year_to_date: expenses[:categories].sum { |c| c[:year_to_date] },
          previous_year: expenses[:categories].sum { |c| c[:previous_year] }
        }
      },
      incomes: {
        sources: incomes[:sources],
        total: {
          year_to_date: incomes[:sources].sum { |s| s[:year_to_date] },
          previous_year: incomes[:sources].sum { |s| s[:previous_year] }
        }
      }
    }
  end

  private

  def self.calculate_expenses(user, current_year, previous_year)
    current_year_expenses = user.expenses.where("extract(year from date) = ?", current_year)
    previous_year_expenses = user.expenses.where("extract(year from date) = ?", previous_year)

    {
      categories: user.categories.map do |category|
        current_year_total = current_year_expenses.where(category: category).sum(:amount)
        previous_year_total = previous_year_expenses.where(category: category).sum(:amount)

        {
          name: category.name,
          year_to_date: current_year_total,
          previous_year: previous_year_total
        }
      end
    }
  end

  def self.calculate_incomes(user, current_year, previous_year)
    current_year_incomes = user.paychecks.where("extract(year from date) = ?", current_year)
    previous_year_incomes = user.paychecks.where("extract(year from date) = ?", previous_year)

    {
      sources: user.income_sources.map do |source|
        current_year_total = current_year_incomes.where(income_source: source).sum(:amount)
        previous_year_total = previous_year_incomes.where(income_source: source).sum(:amount)

        {
          name: source.name,
          year_to_date: current_year_total,
          previous_year: previous_year_total
        }
      end
    }
  end
end 