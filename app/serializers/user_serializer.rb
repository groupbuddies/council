class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :display_name, :notifications_count
end
