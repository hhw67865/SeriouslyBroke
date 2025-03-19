class RegistrationsController < ApplicationController
  skip_before_action :authenticate_user!, only: :create

  def create
    user = User.new(user_params)
    if user.save
      token = generate_jwt_token(user)
      render json: { token: token }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def generate_jwt_token(user)
    JWT.encode(
      { sub: user.id, exp: 24.hours.from_now.to_i },
      Rails.application.credentials.secret_key_base
    )
  end
end
