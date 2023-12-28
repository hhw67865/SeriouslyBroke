class LiabilityTypesController < ApplicationController
  before_action :set_liability_type, only: %i[ show update destroy ]

  # GET /liability_types
  def index
    @liability_types = @current_user.liability_types

    render json: @liability_types
  end

  # GET /liability_types/1
  def show
    render json: @liability_type
  end

  # POST /liability_types
  def create
    @liability_type = @current_user.liability_types.new(liability_type_params)

    if @liability_type.save
      render json: @liability_type, status: :created, location: @liability_type
    else
      render json: @liability_type.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /liability_types/1
  def update
    if @liability_type.update(liability_type_params)
      render json: @liability_type
    else
      render json: @liability_type.errors, status: :unprocessable_entity
    end
  end

  # DELETE /liability_types/1
  def destroy
    @liability_type.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_liability_type
      @liability_type = @current_user.liability_types.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def liability_type_params
      params.require(:liability_type).permit(:name, :user_id)
    end
end
