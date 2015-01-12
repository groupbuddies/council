require_relative 'concerns/subscribable'

class DiscussionCompactSerializer < EditableSerializer
  delegate :subscription_state, to: :object

  attributes :id, :title, :subtitle, :body, :open, :url,
    :comments_count, :updated_at, :subscription_state

  has_one :author

  def url
    return '' unless object.persisted?

    discussion_path(object)
  end
end
