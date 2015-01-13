class DiscussionSerializer < EditableSerializer
  attributes :id, :title, :subtitle, :body, :open,
    :url, :comments_count, :created_at, :updated_at, :status

  has_one :author, embed: :ids
  has_many :comments, embed: :objects

  def url
    return '' unless object.persisted?

    discussion_path(object)
  end

  def status
    Subscription.for(discussion_id: object.id, user_id: scope.id).state
  end
end
