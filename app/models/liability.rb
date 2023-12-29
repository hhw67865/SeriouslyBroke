class Liability < ApplicationRecord
  belongs_to :liability_type
  belongs_to :category
  has_many :expenses, dependent: :destroy

  validates :name, uniqueness: { scope: :liability_type_id }

  before_validation :create_category, on: :create

  private

  def create_category
    build_category(name: "#{name} payment", user_id: liability_type.user_id) unless category
  end
end
