class IncomeSourcesController < ApplicationController
  before_action :set_income_source, only: %i[ show update destroy ]

  # GET /income_sources
  def index
    @income_sources = @current_user.income_sources

    render json: @income_sources
  end

  # GET /income_sources/1
  def show
    render json: @income_source
  end

  # POST /income_sources
  def create
    @income_source = @current_user.income_sources.new(income_source_params)

    if @income_source.save
      render json: @income_source, status: :created, location: @income_source
    else
      render json: @income_source.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /income_sources/1
  def update
    if @income_source.update(income_source_params)
      render json: @income_source
    else
      render json: @income_source.errors, status: :unprocessable_entity
    end
  end

  # DELETE /income_sources/1
  def destroy
    @income_source.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_income_source
      @income_source = @current_user.income_sources.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def income_source_params
      params.require(:income_source).permit(:name, :last_month_income)
    end
end
