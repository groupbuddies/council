require_relative 'concerns/subscribable'

class DiscussionCompactSerializer < EditableSerializer
  include Subscribable

  attributes :id, :title, :subtitle, :body, :open, :url,
    :comments_count, :updated_at, :status

  has_one :author

  def url
    return '' unless object.persisted?

    discussion_path(object)
  end
end
