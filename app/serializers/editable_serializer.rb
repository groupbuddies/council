class EditableSerializer < ActiveModel::Serializer
  attributes :editable

  def editable
    Ability.new(scope).can? :update, object
  end
end
