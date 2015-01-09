class Discussion < ActiveRecord::Base
  has_many :comments
  belongs_to :author, class_name: User
  has_many :subscriptions, dependent: :destroy

  validates_presence_of :title, :author_id, :body
  validates_inclusion_of :open, in: [true, false]

  default_scope -> { order('updated_at DESC') }

  after_create :subscribe_author, :notify_users
  after_touch :notify_new_comment

  private

  def notify_users
    User.all.each do |user|
      Notification.new_discussion(user: user, discussion: self)
    end
  end

  def subscribe_author
    Subscriber.for_discussion(self).subscribe([author])
  end

  def notify_new_comment
    subscriptions.map(&:new_comment)
  end
end
