class DiscussionSerializer < EditableSerializer
  attributes :id, :title, :subtitle, :body, :open,
    :comments_count, :created_at, :status

  has_one :author, embed: :ids
  has_many :comments, embed: :objects

  def status
    Subscription.for(discussion_id: object.id, user_id: scope.id).state
  end
end
