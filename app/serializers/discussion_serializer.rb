class DiscussionSerializer < EditableSerializer
  attributes :id, :title, :subtitle, :body, :open, :comments_count

  has_one :author, embed: :ids
  has_many :comments, embed: :objects
end
