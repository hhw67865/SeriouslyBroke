class UserController < ApplicationController

  def monthly_income
    income = @current_user.monthly_income(month: params[:month], year: params[:year])
    render json: { monthly_income: income }
  end

  def yearly_average_income
    income = @current_user.yearly_average_income(month: params[:month], year: params[:year])
    render json: { yearly_average_income: income }
  end
end
