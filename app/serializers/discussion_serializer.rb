class DiscussionSerializer < ActiveModel::Serializer
  attributes :id, :title, :subtitle, :body, :open, :authors, :comment_count

  has_one :author, embed: :ids
  has_many :comments, embed: :objects

  def authors
    ActiveModel::ArraySerializer.new(
      User.find([object.author_id] + object.comments.map(&:author_id).uniq).sort_by(&:id),
      each_serializer: UserSerializer
    ).serializable_object
  end

  def comment_count
    object.comments.count
  end
end
