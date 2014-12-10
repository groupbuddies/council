class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :discussion
  belongs_to :comment

  has_one :notification

  def initialize
    super
    set_initial_state
  end

  state_machine :state do
    state :new
    state :unread
    state :read
    state :unwatched

    event :opened do
      transition [:new] => :unwatched
      transition [:unread] => :read
    end

    event :updated do
      transition [:read] => :unread
    end

    event :unwatched do
      transition (any - :unwatch) => :unwatch
    end

    event :watched do
      transition [:unwatched] => :read
    end

    event :commented do
      transition [:unwatched] => :read, if: :commented_by_me?
    end

    after_transition any => :unread, do: :create_notification
    after_transition any => :read, do: :destroy_notification
  end

  private

  def destroy_notification
    notification.try :destroy
  end

  def set_initial_state
    self.state ||= if discussion.author_id == user_id
      :read
    else
      :new
    end
  end

  def commented_by_me?
    discussion.comments.where(user_id: user_id).any?
  end
end
