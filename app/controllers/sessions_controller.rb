class SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: :create

  def create
    user = User.find_by(email: params[:email])
    if user&.valid_password?(params[:password])
      token = generate_jwt_token(user)
      render json: { token: token }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def destroy
    # Since we're using JWT, we don't need to do anything server-side
    # The client just needs to remove the token
    render json: { message: 'Signed out successfully' }, status: :ok
  end

  private

  def generate_jwt_token(user)
    JWT.encode(
      { sub: user.id, exp: 24.hours.from_now.to_i },
      Rails.application.credentials.secret_key_base
    )
  end
end
