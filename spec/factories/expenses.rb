FactoryBot.define do
  factory :expense do
    name { "MyString" }
    amount { "" }
    date { "2023-10-26" }
    category { nil }
  end
end
