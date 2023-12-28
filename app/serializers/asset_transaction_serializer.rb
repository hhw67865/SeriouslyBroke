class AssetTransactionSerializer < ActiveModel::Serializer
  attributes :id, :date, :amount
  has_one :asset
end
