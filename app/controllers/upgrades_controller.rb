class UpgradesController < ApplicationController
  before_action :set_upgrade, only: %i[ show update destroy ]

  # GET /upgrades
  def index
    @upgrades = Upgrade.all

    render json: @upgrades
  end

  # GET /upgrades/1
  def show
    render json: @upgrade
  end

  # POST /upgrades
  def create
    @upgrade = Upgrade.new(upgrade_params)

    if @upgrade.save
      render json: @upgrade, status: :created, location: @upgrade
    else
      render json: @upgrade.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /upgrades/1
  def update
    if @upgrade.update(upgrade_params)
      render json: @upgrade
    else
      render json: @upgrade.errors, status: :unprocessable_entity
    end
  end

  # DELETE /upgrades/1
  def destroy
    @upgrade.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_upgrade
      @upgrade = Upgrade.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def upgrade_params
      params.require(:upgrade).permit(:potential_income, :minimum_downpayment, :income_source_id)
    end
end
