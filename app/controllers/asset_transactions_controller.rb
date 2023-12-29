class AssetTransactionsController < ApplicationController
  before_action :set_asset_transaction, only: %i[ show update destroy ]

  # GET /asset_transactions
  def index
    @asset_transactions = @current_user.asset_transactions.order(date: :desc)

    render json: @asset_transactions
  end

  # GET /asset_transactions/1
  def show
    render json: @asset_transaction
  end

  # POST /asset_transactions
  def create
    @asset_transaction = AssetTransaction.new(asset_transaction_params)

    if @asset_transaction.save
      render json: @asset_transaction, status: :created, location: @asset_transaction
    else
      render json: @asset_transaction.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /asset_transactions/1
  def update
    if @asset_transaction.update(asset_transaction_params)
      render json: @asset_transaction
    else
      render json: @asset_transaction.errors, status: :unprocessable_entity
    end
  end

  # DELETE /asset_transactions/1
  def destroy
    @asset_transaction.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_asset_transaction
      @asset_transaction = @current_user.asset_transactions.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def asset_transaction_params
      params.require(:asset_transaction).permit(:date, :amount, :asset_id)
    end
end
