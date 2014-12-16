class DiscussionSerializer < EditableSerializer
  attributes :id, :title, :subtitle, :body, :open, :authors, :comments_count, :created_at

  has_one :author, embed: :ids
  has_many :comments, embed: :objects

  def authors
    ActiveModel::ArraySerializer.new(
      User.find([object.author_id] + object.comments.map(&:author_id).uniq).sort_by(&:id),
      each_serializer: UserSerializer
    ).serializable_object
  end
end
