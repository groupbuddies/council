class NotificationSerializer < ActiveModel::Serializer
  attributes :created_at

  has_one :discussion
  has_one :comment
  has_one :user
end
