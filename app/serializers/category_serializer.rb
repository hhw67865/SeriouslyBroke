class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :minimum_amount, :color
  has_many :expenses do
    object.expenses.order(date: :desc)
  end
end
