class AssetTypeSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :assets

  attribute :total_value, key: :total_value
end
