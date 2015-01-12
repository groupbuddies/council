class Comment < ActiveRecord::Base
  belongs_to :discussion, touch: true, counter_cache: true
  belongs_to :author, class_name: User

  validates_presence_of :body, :author_id, :discussion_id

  default_scope -> { order('created_at ASC') }
end
