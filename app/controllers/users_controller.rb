class UsersController < ApplicationController

  def index
    render json: @current_user
  end

  def update
    if @current_user.update(user_params)
      render json: @current_user
    else
      render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def change_password
    if @current_user.valid_password?(params[:current_password])
      if @current_user.update(password: params[:new_password])
        render json: { message: 'Password updated successfully' }
      else
        render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Current password is incorrect' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:email)
  end
end
