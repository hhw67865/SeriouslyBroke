class Asset < ApplicationRecord
  belongs_to :asset_type
  belongs_to :income_source
  has_many :asset_transactions, dependent: :destroy

  validates :name, uniqueness: { scope: :asset_type_id }

  before_validation :create_income_source, on: :create

  def value
    asset_transactions.sum(:amount)
  end

  private

  def create_income_source
    build_income_source(name: "#{name} income", user_id: asset_type.user_id) unless income_source
  end
end
