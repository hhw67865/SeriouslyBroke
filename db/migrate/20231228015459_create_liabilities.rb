class CreateLiabilities < ActiveRecord::Migration[7.1]
  def change
    create_table :liabilities, id: :uuid do |t|
      t.string :name
      t.money :amount
      t.date :maturity_date
      t.decimal :interest_rate
      t.belongs_to :liability_type, null: false, foreign_key: true, type: :uuid
      t.references :category, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
