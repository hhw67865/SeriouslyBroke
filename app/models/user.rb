class User < ApplicationRecord
  has_one :clerk_user, foreign_key: 'id', primary_key: 'clerk_user_id'
  has_many :categories, dependent: :destroy
  has_many :expenses, through: :categories
  has_many :income_sources, dependent: :destroy
  has_many :upgrades, through: :income_sources
  has_many :paychecks, through: :income_sources
  has_many :asset_types, dependent: :destroy
  has_many :assets, through: :asset_types
  has_many :asset_transactions, through: :assets

  after_create :create_default_categories

  validates :clerk_user_id, uniqueness: true

  DEFAULT_CATEGORIES = ["Housing", "Transportation", "Food", "Utilities", "Medical & Healthcare", "Fitness", "Debt Payments", "Personal Care", "Entertainment", "Pets", "Clothes", "Miscellaneous"]

  def create_default_categories
    Category.insert_all(
      DEFAULT_CATEGORIES.map do |category|
        { name: category, user_id: id }
      end
    )
  end
end
