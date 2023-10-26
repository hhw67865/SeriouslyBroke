require "rails_helper"

RSpec.describe PaychecksController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/paychecks").to route_to("paychecks#index")
    end

    it "routes to #show" do
      expect(get: "/paychecks/1").to route_to("paychecks#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/paychecks").to route_to("paychecks#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/paychecks/1").to route_to("paychecks#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/paychecks/1").to route_to("paychecks#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/paychecks/1").to route_to("paychecks#destroy", id: "1")
    end
  end
end
