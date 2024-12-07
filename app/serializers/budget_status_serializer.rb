class BudgetStatusSerializer < ActiveModel::Serializer
  attributes :description, :month, :year, :generated_at, :exceeding_categories

  def exceeding_categories
    object.user.exceeding_categories(object.month, object.year)
  end
end
