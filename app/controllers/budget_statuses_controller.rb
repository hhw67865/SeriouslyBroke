class BudgetStatusesController < ApplicationController
  before_action :set_budget_status

  def budget_status
    if @budget_status.nil?
      render json: { error: 'Budget status not found' }, status: :not_found
    else
      render json: @budget_status, status: :ok
    end
  end

  def refresh
    @budget_status.generate_description
    if @budget_status.save
      render json: @budget_status, status: :ok
    else
      render json: @budget_status.errors, status: :unprocessable_entity
    end
  end

  private

  def set_budget_status
    @budget_status = @current_user.budget_statuses.find_or_create_by(month: params[:month].to_i, year: params[:year].to_i)
  end
end
