require "rails_helper"

RSpec.describe UpgradesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/upgrades").to route_to("upgrades#index")
    end

    it "routes to #show" do
      expect(get: "/upgrades/1").to route_to("upgrades#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/upgrades").to route_to("upgrades#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/upgrades/1").to route_to("upgrades#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/upgrades/1").to route_to("upgrades#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/upgrades/1").to route_to("upgrades#destroy", id: "1")
    end
  end
end
