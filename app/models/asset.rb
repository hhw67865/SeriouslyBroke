class Asset < ApplicationRecord
  belongs_to :asset_type
  belongs_to :income_source
  has_many :asset_transactions, dependent: :destroy

  before_validation :create_income_source, on: :create

  private

  def create_income_source
    build_income_source(name: "#{name} income") unless income_source
  end
end
