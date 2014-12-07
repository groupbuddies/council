class DiscussionSerializer < ActiveModel::Serializer
  attributes :id, :title, :subtitle, :body, :authors

  has_one :author
  has_many :comments, embed: :objects

  def authors
    ([object.author] + Comment.find(object.comments.map(&:author_id).uniq)).sort_by(&:id)
  end
end
