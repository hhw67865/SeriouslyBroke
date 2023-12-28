class CreateAssetTransactions < ActiveRecord::Migration[7.1]
  def change
    create_table :asset_transactions, id: :uuid do |t|
      t.date :date
      t.money :amount
      t.belongs_to :asset, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
