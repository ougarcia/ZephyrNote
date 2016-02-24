FactoryGirl.define do
  factory :tag do
    sequence(:title) { |n| Faker::Hacker.adjective + "#{n}" }
    user
  end
end
