class CreateIncomeSources < ActiveRecord::Migration[7.1]
  def change
    create_table :income_sources, id: :uuid do |t|
      t.string :name
      t.references :user, type: :uuid, null: false, foreign_key: true

      t.timestamps
    end
  end
end
