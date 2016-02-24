require 'faker'

FactoryGirl.define do
  factory :notebook do 
    title { Faker::Hacker.noun }
    created_at { 10.days.ago }
    updated_at { 5.days.ago }
    user
  end

  factory :tagging do
  end

end
