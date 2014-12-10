class DiscussionCompactSerializer < EditableSerializer
  attributes :id, :title, :subtitle, :body, :open, :url, :comments_count, :updated_at, :status

  has_one :author

  def url
    return '' unless object.persisted?

    discussion_path(object)
  end

  def status
    object.status_for_user(scope)
  end
end
