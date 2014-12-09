class Notification < ActiveRecord::Base
  belongs_to :user
  belongs_to :discussion
  belongs_to :comment

  validates :discussion_id, uniqueness: { scope: [:user_id] }

  def new_discussion?
    comment_id.nil?
  end

  def updated_discussion?
    comment_id.present?
  end
end
