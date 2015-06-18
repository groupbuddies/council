class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :discussion_id, :kind
end
