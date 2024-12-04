class ExpensesController < ApplicationController
  before_action :set_expense, only: %i[ show update destroy ]

  # GET /expenses
  def index
    @expenses = @current_user.expenses

    render json: @expenses
  end

  # GET /expenses/1
  def show
    render json: @expense
  end

  # POST /expenses
  def create
    Expense.transaction do
      @expenses = Expense.create!(expenses_params)
    end
    render json: @expenses, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  # PATCH/PUT /expenses/1
  def update
    if @expense.update(expense_params)
      render json: @expense
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  # DELETE /expenses/1
  def destroy
    @expense.destroy!
  end

  def week
    date = Date.parse(params[:date])
    start_of_week = date.beginning_of_week
    end_of_week = date.end_of_week
    @expenses = @current_user.expenses.where('date >= ? AND date <= ?', start_of_week, end_of_week)
    render json: @expenses
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_expense
      @expense = @current_user.expenses.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def expense_params
      params.require(:expense).permit(:name, :amount, :date, :category_id, :frequency)
    end

    def expenses_params
      params.require(:expenses).map do |p|
        p.permit(:name, :amount, :date, :category_id, :frequency)
      end
    end
end
