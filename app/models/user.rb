class User < ApplicationRecord
  has_one :clerk_user, foreign_key: 'id', primary_key: 'clerk_user_id'
  has_many :categories, dependent: :destroy
  has_many :expenses, through: :categories
  has_many :income_sources, dependent: :destroy
  has_many :upgrades, through: :income_sources
  has_many :paychecks, through: :income_sources

  after_create :create_default_categories

  DEFAULT_CATEGORIES = ["Housing", "Transportation", "Food", "Utilities", "Medical & Healthcare", "Fitness", "Debt Payments", "Personal Care", "Entertainment", "Pets", "Clothes", "Miscellaneous"]

  def create_default_categories
    DEFAULT_CATEGORIES.each do |category|
      categories.create(name: category)
    end
  end
end
