class LiabilityType < ApplicationRecord
  belongs_to :user
  has_many :liabilities, dependent: :destroy

  validates :name, uniqueness: { scope: :user_id }
end
