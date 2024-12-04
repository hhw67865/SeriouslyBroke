class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :name, :amount, :date, :frequency
  has_one :category
end
