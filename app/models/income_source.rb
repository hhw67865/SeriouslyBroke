class IncomeSource < ApplicationRecord
  belongs_to :user
  has_many :paychecks, dependent: :destroy
  has_one :upgrade, dependent: :destroy
end
