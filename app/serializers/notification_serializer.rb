class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :kind, :url
end
