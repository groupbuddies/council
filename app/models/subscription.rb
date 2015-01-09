class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :discussion

  def self.for(discussion_id: discussion_id, user_id: user_id)
    where(discussion_id: discussion_id, user_id: user_id).first_or_create
  end

  before_create :set_initial_state

  state_machine :state do
    after_transition any => :unread, do: :send_notification
    after_transition any => :read, do: :destroy_notifications

    state :unread
    state :read

    event :make_read do
      transition [:unread] => :read
    end

    event :new_comment do
      transition [:read] => :unread, if: :commented_by_someone_else?
    end
  end

  def set_initial_state
    return if state

    self.state = :read
  end

  def commented_by_someone_else?
    last_author.id != user_id
  end

  def last_author
    (last_comment || discussion).author
  end

  def last_comment
    discussion.comments.last
  end

  def send_notification
    return unless last_comment

    Notification.new_comment(user: user, comment: last_comment)
  end

  def notifications
    Notification.where(user_id: user_id, discussion_id: discussion_id)
  end

  def destroy_notifications
    notifications.destroy_all
  end
end
