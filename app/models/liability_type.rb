class LiabilityType < ApplicationRecord
  belongs_to :user
  has_many :liabilities, dependent: :destroy
end
