class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :name, :amount, :date
  has_one :category
end