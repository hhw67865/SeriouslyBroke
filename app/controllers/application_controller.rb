class ApplicationController < ActionController::API
  before_action :authenticate_user!

  private

  def authenticate_user!
    clerk = Clerk::SDK.new
    session = clerk.sessions.find(request.headers['session_id'])
    if session && session["status"] == "active"
      @current_user = User.create_or_find_by(clerk_user_id: session["user_id"])
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end
