class DiscussionSerializer < ActiveModel::Serializer
  attributes :title, :subtitle, :body

  has_one :author
end
