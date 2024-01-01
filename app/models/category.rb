class Category < ApplicationRecord
  belongs_to :user
  has_many :expenses, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :user_id }

  def last_month_total
    start_date = Date.today.months_ago(1).beginning_of_month
    end_date = Date.today.months_ago(1).end_of_month
    expenses.where(date: start_date..end_date).sum(:amount)
  end

  def last_three_month_average
    start_date = Date.today.months_ago(3).beginning_of_month
    end_date = Date.today.months_ago(1).end_of_month
    expenses.where(date: start_date..end_date).sum(:amount) / 3
  end
end
