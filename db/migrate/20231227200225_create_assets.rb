class CreateAssets < ActiveRecord::Migration[7.1]
  def change
    create_table :assets, id: :uuid do |t|
      t.string :name
      t.belongs_to :asset_type, null: false, foreign_key: true, type: :uuid
      t.references :income_source, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
