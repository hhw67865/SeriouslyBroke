class CreatePaychecks < ActiveRecord::Migration[7.1]
  def change
    create_table :paychecks, id: :uuid do |t|
      t.date :date
      t.money :amount
      t.references :income_source, type: :uuid, null: false, foreign_key: true

      t.timestamps
    end
  end
end
