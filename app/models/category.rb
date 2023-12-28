class Category < ApplicationRecord
  belongs_to :user
  has_many :expenses, dependent: :destroy
  has_one :liability

  validates :name, presence: true
end
