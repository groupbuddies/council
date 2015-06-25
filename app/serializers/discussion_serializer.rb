class DiscussionSerializer < EditableSerializer
  attributes :id, :title, :subtitle, :body, :open,
    :url, :comments_count, :commenter_ids, :created_at, :updated_at, :status,
    :tag_list

  has_one :author, embed: :ids

  def commenter_ids
    object.comments.pluck(:author_id).uniq
  end

  def url
    return '' unless object.persisted?

    discussion_path(object)
  end

  def status
    Subscription.for(discussion_id: object.id, user_id: scope.id).state
  end
end
