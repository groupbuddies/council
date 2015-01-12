class Discussion < ActiveRecord::Base
  has_many :comments
  belongs_to :author, class_name: User
  has_many :subscriptions

  validates_presence_of :title, :open, :author_id, :body
  validates_inclusion_of :open, in: [true, false]

  default_scope -> { order('updated_at DESC') }

  def notify_new_comment
    User.all.each do |user|
      Subscription.for(discussion_id: id, user_id: user.id).new_comment
    end
  end
end
