class DiscussionCompactSerializer < EditableSerializer
  attributes :id, :title, :subtitle, :body, :open, :url, :comments_count, :updated_at, :status

  has_one :author

  def url
    return '' unless object.persisted?

    discussion_path(object)
  end

  def status
    Subscription.for(discussion: object, user: scope).state
  end
end
