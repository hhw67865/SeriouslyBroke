require "rails_helper"

RSpec.describe LiabilityTypesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/liability_types").to route_to("liability_types#index")
    end

    it "routes to #show" do
      expect(get: "/liability_types/1").to route_to("liability_types#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/liability_types").to route_to("liability_types#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/liability_types/1").to route_to("liability_types#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/liability_types/1").to route_to("liability_types#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/liability_types/1").to route_to("liability_types#destroy", id: "1")
    end
  end
end
