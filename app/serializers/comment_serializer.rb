class CommentSerializer < EditableSerializer
  attributes :id, :body, :editable, :created_at

  has_one :author
end
