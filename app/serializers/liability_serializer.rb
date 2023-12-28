class LiabilitySerializer < ActiveModel::Serializer
  attributes :id, :name, :amount, :maturity_date, :interest_rate
  has_one :liability_type
  has_one :category
end
