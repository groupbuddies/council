class DiscussionCompactSerializer < ActiveModel::Serializer
  attributes :id, :title, :subtitle, :body, :url

  has_one :author

  def url
    discussion_path(object)
  end
end
