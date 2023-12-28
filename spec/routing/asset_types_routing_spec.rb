require "rails_helper"

RSpec.describe AssetTypesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/asset_types").to route_to("asset_types#index")
    end

    it "routes to #show" do
      expect(get: "/asset_types/1").to route_to("asset_types#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/asset_types").to route_to("asset_types#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/asset_types/1").to route_to("asset_types#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/asset_types/1").to route_to("asset_types#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/asset_types/1").to route_to("asset_types#destroy", id: "1")
    end
  end
end
