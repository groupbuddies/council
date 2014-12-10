require 'faker'

FactoryGirl.define do
  factory :subscription do
    association :discussion
    association :user
  end

  factory :discussion do
    association :author
    title { Faker::Lorem.words }
    subtitle { Faker::Lorem.sentence }
    body { Faker::Lorem.paragraphs(2) }
  end

  factory :user, aliases: [:author] do
    first_name { Faker::Name.first_name }
    last_name  { Faker::Name.last_name }
    email      { Faker::Internet.email }
    password   { Faker::Internet.password(8) }
  end
end
