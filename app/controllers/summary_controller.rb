class SummaryController < ApplicationController
  def monthly_summary
    month = params[:month].to_i
    year = params[:year].to_i

    if valid_date_params?(month, year)
      render json: BudgetStatusService.call(@current_user, month, year), status: :ok
    else
      render json: { error: 'Invalid month or year' }, status: :bad_request
    end
  end

  private

  def valid_date_params?(month, year)
    (1..12).include?(month) && year.to_s.match?(/\A\d{4}\z/)
  end
end
