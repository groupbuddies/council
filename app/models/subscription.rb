class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :discussion

  def self.for(discussion_id: discussion_id, user_id: user_id)
    where(discussion_id: discussion_id, user_id: user_id).first_or_create
  end

  before_create :set_initial_state
  after_create :notify_discussion, if: :user_is_older_than_discussion?

  state_machine :state do
    after_transition any => :unread, do: :notify_comment
    after_transition any => [:watching, :watched], do: :destroy_notifications

    state :unread
    state :watching
    state :watched
    state :unwatched

    event :watch do
      transition any => :watching
    end

    event :make_watched do
      transition [:unread] => :watching
      transition [:unwatched] => :watched
    end

    event :new_comment do
      transition [:watching] => :unread, if: :commented_by_someone_else?
      transition [:unwatched, :watched] => :watching, if: :commented_by_me?
    end
  end

  def set_initial_state
    return if state

    self.state = initial_state
  end

  def notify_comment
    return unless last_comment

    Notification.new_comment(user: user, comment: last_comment)
  end

  def notify_discussion
    return if watching?

    Notification.new_discussion(user: user, discussion: discussion)
  end

  def notifications
    Notification.where(user_id: user_id, discussion_id: discussion_id)
  end

  def destroy_notifications
    notifications.destroy_all
  end

  private

  def initial_state
    if created_by_me?
      :watching
    else
      :unwatched
    end
  end

  def commented_by_someone_else?
    last_author.id != user_id
  end

  def commented_by_me?
    !commented_by_someone_else?
  end

  def created_by_me?
    discussion.author_id == user.id
  end

  def user_is_older_than_discussion?
    user.created_at < discussion.created_at
  end

  def last_author
    (last_comment || discussion).author
  end

  def last_comment
    discussion.comments.last
  end
end
