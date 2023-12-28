require "rails_helper"

RSpec.describe AssetTransactionsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/asset_transactions").to route_to("asset_transactions#index")
    end

    it "routes to #show" do
      expect(get: "/asset_transactions/1").to route_to("asset_transactions#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/asset_transactions").to route_to("asset_transactions#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/asset_transactions/1").to route_to("asset_transactions#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/asset_transactions/1").to route_to("asset_transactions#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/asset_transactions/1").to route_to("asset_transactions#destroy", id: "1")
    end
  end
end
