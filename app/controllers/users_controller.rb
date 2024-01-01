class UsersController < ApplicationController

  def index
    render json: @current_user
  end

  def graph_data
    start_date = Date.today.months_ago(params[:months].to_i-1).beginning_of_month
    end_date = Date.today.end_of_month
    unique_income_sources = @current_user.paychecks.includes(:income_source).where(date: start_date..end_date).distinct.pluck('income_sources.name')
    months = (start_date..end_date).map{ |date| "#{date.strftime("%b")} #{date.strftime("%Y")}" }.uniq

    series = unique_income_sources.map do |income_source|
      data = months.map do |month|
        date = Date.parse(month)
        date_end = date.end_of_month
        @current_user.paychecks.joins(:income_source).where('income_sources.name = ? AND date BETWEEN ? AND ?', income_source, date, date_end).sum(:amount).to_f
      end
      {
        data: data,
        label: income_source,
        stack: "total"
      }
    end

    data = {
      xAxis: {
        data: months,
        scaleType: "band"
      },
      series: series
    }
    render json: data
  end
end
