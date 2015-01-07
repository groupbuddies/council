class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :discussion
  belongs_to :first_unread_comment, class_name: 'Comment'

  def self.for(discussion_id: discussion_id, user_id: user_id)
    where(discussion_id: discussion_id, user_id: user_id).first_or_create
  end

  after_create :set_initial_state

  state_machine :state do
    after_transition any => :unread, do: :notify

    state :new
    state :unread
    state :read
    state :unwatched

    event :make_viewed do
      transition [:new] => :unwatched
      transition [:unread] => :read
    end

    event :unwatch do
      transition((any - :unwatched) => :unwatched)
    end

    event :watch do
      transition [:unwatched] => :read
    end

    event :new_comment do
      transition [:unwatched] => :read, if: :new_comment_by_me?
      transition [:read] => :unread, if: :new_comment_by_someone_else?
    end
  end

  def set_initial_state
    return if state

    update state: initial_state
  end

  def new_comment_by_me?
    last_author.id == user_id
  end

  def new_comment_by_someone_else?
    !new_comment_by_me?
  end

  def last_author
    (discussion.comments.last || discussion).author
  end

  def notify
    NotificationsMailer.new_comment(id).deliver_later
  end

  private

  def initial_state
    if discussion.author_id == user_id
      :read
    else
      :new
    end
  end
end
