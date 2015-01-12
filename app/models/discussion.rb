class Discussion < ActiveRecord::Base
  has_many :comments
  belongs_to :author, class_name: User
  has_many :subscriptions, dependent: :destroy

  validates_presence_of :title, :author_id, :body
  validates_inclusion_of :open, in: [true, false]

  default_scope -> { order('updated_at DESC') }

  after_touch :notify_new_comment

  private

  def notify_new_comment
    subscriptions = Subscriber.for_discussion(self).subscribe(User.all)
    subscriptions.map(&:new_comment)
  end
end
