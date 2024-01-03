class PaycheckSerializer < ActiveModel::Serializer
  attributes :id, :amount, :date, :description
  belongs_to :income_source
end
