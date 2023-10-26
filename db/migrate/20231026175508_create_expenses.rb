class CreateExpenses < ActiveRecord::Migration[7.1]
  def change
    create_table :expenses, id: :uuid do |t|
      t.string :name
      t.money :amount
      t.date :date
      t.references :category, type: :uuid, null: false, foreign_key: true

      t.timestamps
    end
  end
end
