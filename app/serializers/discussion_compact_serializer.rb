class DiscussionCompactSerializer < ActiveModel::Serializer
  attributes :id, :title, :subtitle, :body, :open, :url

  has_one :author

  def url
    return '' unless object.persisted?

    discussion_path(object)
  end
end
