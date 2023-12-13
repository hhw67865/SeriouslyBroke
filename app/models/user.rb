class User < ApplicationRecord
  has_one :clerk_user, foreign_key: 'id', primary_key: 'clerk_user_id'
  has_many :categories, dependent: :destroy
  has_many :expenses, through: :categories
  has_many :income_sources, dependent: :destroy
  has_many :upgrades, through: :income_sources
  has_many :paychecks, through: :income_sources

  after_create :create_default_categories

  validates :clerk_user_id, uniqueness: true

  DEFAULT_CATEGORIES = ["Housing", "Transportation", "Food", "Utilities", "Medical & Healthcare", "Fitness", "Debt Payments", "Personal Care", "Entertainment", "Pets", "Clothes", "Miscellaneous"]

  def create_default_categories
    DEFAULT_CATEGORIES.each do |category|
      categories.create(name: category)
    end
  end

  def monthly_income(month: Date.today.prev_month.month, year: Date.today.prev_month.year)
    start_date = Date.new(year, month)
    end_date = start_date.end_of_month

    paychecks
      .where(date: start_date..end_date)
      .sum(:amount)
  end

  def yearly_average_income(month: Date.today.prev_month.month, year: Date.today.prev_month.year)
    start_date = Date.new(year)
    end_date = Date.new(year, month).end_of_month
    paychecks
      .where(date: start_date..end_date)
      .sum(:amount) / month
  end
end
