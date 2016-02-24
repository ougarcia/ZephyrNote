FactoryGirl.define do
  factory :notebook do 
    title { Faker::Hacker.noun }
    user
  end
end
