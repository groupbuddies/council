require_relative 'concerns/subscribable'

class DiscussionSerializer < EditableSerializer
  include Subscribable

  attributes :id, :title, :subtitle, :body, :open,
    :comments_count, :created_at, :status

  has_one :author, embed: :ids
  has_many :comments, embed: :objects
end
