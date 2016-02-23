require 'faker'

FactoryGirl.define do
  factory :notebook do 
    title { Faker::Hacker.noun }
    created_at { 10.days.ago }
    updated_at { 5.days.ago }
  end

  factory :tag do
    title { Faker::Hacker.adjective }
  end

  factory :note do
    title { Faker::Lorem.sentence }
    body { Faker::Hacker.say_something_smart }
    created_at { 10.minutes.ago }
    updated_at { 5.minutes.ago }
  end

  factory :tagging do
  end

end
