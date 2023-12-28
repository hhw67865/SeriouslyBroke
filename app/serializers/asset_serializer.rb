class AssetSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :asset_type
  has_one :income_source
end
