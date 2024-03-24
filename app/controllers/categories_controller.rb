class CategoriesController < ApplicationController
  before_action :set_category, only: %i[ show update destroy ]
  before_action :reassign_children, only: [:destroy]

  # GET /categories
  def index
    @categories = @current_user.categories.order('LOWER(name)')

    render json: @categories
  end

  # GET /categories/1
  def show
    render json: @category
  end

  # POST /categories
  def create
    @category = @current_user.categories.new(category_params)

    if @category.save
      render json: @category, status: :created, location: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /categories/1
  def update
    if @category.update(category_params)
      render json: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categories/1
  def destroy
    @category.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = @current_user.categories.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def category_params
      params.require(:category).permit(:name, :minimum_amount, :color)
    end

    def reassign_children
      return unless params[:category_id]

      @category.expenses.update_all(category_id: params[:category_id])
    end
end
