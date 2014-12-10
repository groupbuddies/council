class Discussion < ActiveRecord::Base
  has_many :comments
  belongs_to :author, class_name: User
  has_many :subscriptions

  validates_presence_of :title, :open, :author_id, :body
  validates_inclusion_of :open, in: [true, false]

  default_scope -> { order('updated_at DESC') }

  after_save :update_subscriptions

  def status_for_user(user)
    notification = user.notifications.where(discussion_id: id).first

    return :read    if notification.nil?
    return :new     if notification.new_discussion?
    return :updated if notification.updated_discussion?
  end

  private

  def update_subscriptions
    subscriptions.map(&:update_status)
  end

end
