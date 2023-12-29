class AssetSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :asset_type
  has_many :asset_transactions

  attribute :value, key: :value
end
