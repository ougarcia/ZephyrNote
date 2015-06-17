require 'faker'

FactoryGirl.define do
  factory :user do
    username { Faker::Internet.user_name }
    password 'password'
  end

  factory :notebook do 
    title { Faker::Hacker.noun }
  end

  factory :tag do
    title { Faker::Hacker.adjective }
  end

  factory :note do
    title { Faker::Lorem.sentence }
    body { Faker::Hacker.say_something_smart }
  end

  tag_range = Tag.pluck(:id)
  note_range = Note.pluck(:id)
  factory :tagging do 
    note_id { note_range.sample(1) }
    tag_id { tag_range.sample(1) }
  end
end
