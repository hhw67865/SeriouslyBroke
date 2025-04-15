class SummaryController < ApplicationController
  def graph_data
    month = params[:month].to_i
    year = params[:year].to_i

    render json: GraphService.call(@current_user, month, year), status: :ok
  end

  def income_summary
    months = params[:months].to_i

    if months.between?(0, 12)
      render json: IncomeStatusService.call(@current_user, months), status: :ok
    else
      render json: { error: 'Invalid months parameter' }, status: :bad_request
    end
  end

  def category_summary
    render json: CategoryStatusService.call(@current_user, params[:month].to_i, params[:year].to_i), status: :ok
  end

  def yearly_summary
    render json: YearlySummaryService.call(@current_user), status: :ok
  end

  private

  def valid_date_params?(month, year)
    (1..12).include?(month) && year.to_s.match?(/\A\d{4}\z/)
  end
end
