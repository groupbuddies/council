class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :discussion
  belongs_to :comment

  def self.for(discussion: discussion, user: user)
    where(discussion: discussion, user: user).first_or_create
  end

  after_create :set_initial_state

  state_machine :state do
    state :new
    state :unread
    state :read
    state :unwatched

    event :opened do
      transition [:new] => :unwatched
      transition [:unread] => :read
    end

    event :unwatched do
      transition((any - :unwatched) => :unwatched)
    end

    event :watched do
      transition [:unwatched] => :read
    end

    event :commented do
      transition [:unwatched] => :read, if: :commented_by_me?
      transition [:read] => :unread, if: :commented_by_someone_else?
    end
  end

  def set_initial_state
    return if state

    new_state = if discussion.author_id == user_id
                  :read
                else
                  :new
                end

    update state: new_state
  end

  def commented_by_me?
    last_author.id == user_id
  end

  def commented_by_someone_else?
    !commented_by_me?
  end

  def last_author
    (discussion.comments.last || discussion).author
  end
end
