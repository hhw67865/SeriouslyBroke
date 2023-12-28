FactoryBot.define do
  factory :liability do
    name { "MyString" }
    amount { "" }
    maturity_date { "2023-12-27" }
    interest_rate { "9.99" }
    liability_type { nil }
    category { nil }
  end
end
