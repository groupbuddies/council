if Rails.env.development?
  require 'faker'

  namespace :dev do
    desc 'Populates DB with fake data'
    task populate: :environment do
      user_ids = User.ids

      1.upto(10) do
        Discussion.new.tap do |discussion|
          discussion.title = Faker::Lorem.sentence
          discussion.subtitle = Faker::Lorem.sentence
          discussion.author_id = user_ids.sample
          discussion.body = Faker::Lorem.paragraph
          discussion.body += "\n[a link](http://blog.groupbuddies.com)"
          discussion.tags = Faker::Lorem.words.join(',')
          discussion.save

          add_comments(discussion, user_ids.sample)
        end
      end
    end

    def add_comments(discussion, user_id)
      1.upto(rand(5)) do
        discussion.comments.new do |comment|
          comment.body = "a **markdown** *comment*"
          comment.author_id = user_id
          comment.save
        end
      end
    end
  end
end
