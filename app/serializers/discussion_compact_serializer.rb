class DiscussionCompactSerializer < ActiveModel::Serializer
  attributes :id, :title, :subtitle, :body, :open, :url, :comment_count, :updated_at

  has_one :author

  def url
    return '' unless object.persisted?

    discussion_path(object)
  end

  def comment_count
    object.comments.count
  end
end
