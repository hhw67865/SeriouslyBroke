class Paycheck < ApplicationRecord
  belongs_to :income_source
  accepts_nested_attributes_for :income_source
end
