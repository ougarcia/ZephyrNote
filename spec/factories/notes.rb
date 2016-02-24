FactoryGirl.define do
  factory :note do
    title { Faker::Lorem.sentence }
    body { Faker::Hacker.say_something_smart }

    factory :note_with_associations do
      notebook
    end
  end
end
