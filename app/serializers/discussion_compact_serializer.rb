class DiscussionCompactSerializer < EditableSerializer
  attributes :id, :title, :subtitle, :body, :open, :url, :comments_count, :updated_at, :status

  has_one :author

  def url
    return '' unless object.persisted?

    discussion_path(object)
  end

  def status
    Subscription.for(discussion_id: object.id, user_id: scope.id).state
  end
end
