class Comment < ActiveRecord::Base
  belongs_to :discussion, touch: true, counter_cache: true
  belongs_to :author, class_name: User

  after_save :notify

  validates_presence_of :body, :author_id, :discussion_id

  default_scope -> { order('created_at ASC') }

  private

  def notify
    User.where.not(id: author.id).pluck(:id).map do |user_id|
      Notification.where(user_id: user_id, discussion_id: discussion.id).first_or_create(comment: self)
    end
  end
end
