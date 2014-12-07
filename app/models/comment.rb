class Comment < ActiveRecord::Base
  belongs_to :discussion
  belongs_to :author, class_name: User

  validates_presence_of :body, :author_id, :discussion_id
end
