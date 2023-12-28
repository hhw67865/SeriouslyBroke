class Liability < ApplicationRecord
  belongs_to :liability_type
  belongs_to :category
  has_many :expenses, dependent: :destroy

  before_validation :create_category, on: :create

  private

  def create_category
    build_category(name: "#{name} payment") unless category
  end
end
