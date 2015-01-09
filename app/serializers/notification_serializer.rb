class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :text, :url
end
