class Category < ApplicationRecord
  include ExpenseCalculable

  belongs_to :user
  has_many :expenses, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :user_id }

  def minimum_amount
    super || 0
  end
end
