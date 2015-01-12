require_relative 'concerns/subscribable'

class DiscussionSerializer < EditableSerializer
  delegate :subscription_state, to: :object

  attributes :id, :title, :subtitle, :body, :open,
    :comments_count, :created_at, :subscription_state

  has_one :author, embed: :ids
  has_many :comments, embed: :objects
end
