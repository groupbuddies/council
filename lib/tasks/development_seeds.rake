if Rails.env.development?

  namespace :db do
    desc 'Populates DB with fake data'
    task populate: :environment do
      require 'faker'

      [User, Discussion, Comment].each(&:delete_all)

      for i in 0..20
        user = User.new
        user.email = Faker::Internet.email
        user.password = Faker::Internet.password(9)
        user.first_name = Faker::Name.first_name
        user.last_name = Faker::Name.last_name
        user.save

        discussion = Discussion.new
        discussion.title = Faker::Lorem.words
        discussion.subtitle = Faker::Lorem.sentence
        discussion.author_id = user.id
        discussion.body = Faker::Lorem.paragraph
        discussion.tags = Faker::Lorem.words
        discussion.save

        comment = Comment.new
        comment.body = Faker::Lorem.words
        comment.author_id = user.id
        comment.discussion_id = discussion.id
      end
    end
  end
end
