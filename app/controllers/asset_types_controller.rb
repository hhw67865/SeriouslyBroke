class AssetTypesController < ApplicationController
  before_action :set_asset_type, only: %i[ show update destroy ]

  # GET /asset_types
  def index
    @asset_types = AssetType.all

    render json: @asset_types
  end

  # GET /asset_types/1
  def show
    render json: @asset_type
  end

  # POST /asset_types
  def create
    @asset_type = AssetType.new(asset_type_params)

    if @asset_type.save
      render json: @asset_type, status: :created, location: @asset_type
    else
      render json: @asset_type.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /asset_types/1
  def update
    if @asset_type.update(asset_type_params)
      render json: @asset_type
    else
      render json: @asset_type.errors, status: :unprocessable_entity
    end
  end

  # DELETE /asset_types/1
  def destroy
    @asset_type.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_asset_type
      @asset_type = AssetType.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def asset_type_params
      params.require(:asset_type).permit(:name, :user_id)
    end
end
