class CommentSerializer < EditableSerializer
  attributes :id, :body, :editable

  has_one :author
end
