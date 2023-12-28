class CreateLiabilityTypes < ActiveRecord::Migration[7.1]
  def change
    create_table :liability_types, id: :uuid do |t|
      t.string :name
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
