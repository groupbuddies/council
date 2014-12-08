class Notification < ActiveRecord::Base
  belongs_to :user
  belongs_to :discussion
  belongs_to :comment

  validates :discussion_id, uniqueness: { scope: [:user_id] }
end
