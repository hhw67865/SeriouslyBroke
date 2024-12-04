# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_12_02_044105) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "asset_transactions", force: :cascade do |t|
    t.date "date"
    t.money "amount", scale: 2
    t.text "description"
    t.bigint "asset_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asset_id"], name: "index_asset_transactions_on_asset_id"
  end

  create_table "asset_types", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_asset_types_on_user_id"
  end

  create_table "assets", force: :cascade do |t|
    t.string "name"
    t.bigint "asset_type_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asset_type_id"], name: "index_assets_on_asset_type_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.money "minimum_amount", scale: 2
    t.string "color"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_categories_on_user_id"
  end

  create_table "expenses", force: :cascade do |t|
    t.string "name"
    t.money "amount", scale: 2
    t.date "date"
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "frequency"
    t.index ["category_id"], name: "index_expenses_on_category_id"
  end

  create_table "income_sources", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_income_sources_on_user_id"
  end

  create_table "paychecks", force: :cascade do |t|
    t.date "date"
    t.money "amount", scale: 2
    t.bigint "income_source_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
    t.index ["income_source_id"], name: "index_paychecks_on_income_source_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.text "description"
    t.boolean "completed"
    t.bigint "upgrade_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["upgrade_id"], name: "index_tasks_on_upgrade_id"
  end

  create_table "upgrades", force: :cascade do |t|
    t.money "potential_income", scale: 2
    t.money "minimum_downpayment", scale: 2
    t.bigint "income_source_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["income_source_id"], name: "index_upgrades_on_income_source_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "clerk_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "asset_transactions", "assets"
  add_foreign_key "asset_types", "users"
  add_foreign_key "assets", "asset_types"
  add_foreign_key "categories", "users"
  add_foreign_key "expenses", "categories"
  add_foreign_key "income_sources", "users"
  add_foreign_key "paychecks", "income_sources"
  add_foreign_key "tasks", "upgrades"
  add_foreign_key "upgrades", "income_sources"
end
