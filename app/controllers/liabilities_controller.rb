class LiabilitiesController < ApplicationController
  before_action :set_liability, only: %i[ show update destroy ]

  # GET /liabilities
  def index
    @liabilities = @current_user.liabilities

    render json: @liabilities
  end

  # GET /liabilities/1
  def show
    render json: @liability
  end

  # POST /liabilities
  def create
    @liability = Liability.new(liability_params)

    if @liability.save
      render json: @liability, status: :created, location: @liability
    else
      render json: @liability.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /liabilities/1
  def update
    if @liability.update(liability_params)
      render json: @liability
    else
      render json: @liability.errors, status: :unprocessable_entity
    end
  end

  # DELETE /liabilities/1
  def destroy
    @liability.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_liability
      @liability = @current_user.liabilities.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def liability_params
      params.require(:liability).permit(:name, :amount, :maturity_date, :interest_rate, :liability_type_id, :category_id)
    end
end
