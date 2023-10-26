class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks, id: :uuid do |t|
      t.text :description
      t.boolean :completed
      t.references :upgrade, type: :uuid, null: false, foreign_key: true

      t.timestamps
    end
  end
end
