class CommentSerializer < EditableSerializer
  attributes :id, :body, :editable, :created_at, :discussion_id

  has_one :author, embed: :ids
end
