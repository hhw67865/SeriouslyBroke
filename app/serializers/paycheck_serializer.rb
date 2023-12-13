class PaycheckSerializer < ActiveModel::Serializer
  attributes :id, :amount, :date
  belongs_to :income_source
end
