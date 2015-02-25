class Notification < ActiveRecord::Base
  TYPES = %w(new_discussion new_comment)

  belongs_to :user
  belongs_to :discussion

  validates :user, presence: true
  validates :kind, inclusion: { in: TYPES }

  delegate :email, to: :user

  after_create :send_email

  def self.new_comment(user:, comment:)
    discussion = comment.discussion
    create(
      kind: :new_comment,
      discussion_id: discussion.id,
      user_id: user.id
    )
  end

  def self.new_discussion(user:, discussion:)
    create(
      kind: :new_discussion,
      discussion_id: discussion.id,
      user_id: user.id
    )
  end

  private

  def send_email
    NotificationsMailer.new_notification(id).deliver_later
  end

  def self.root_url(*args)
    Rails.application.routes.url_helpers.root_url(*args, host: default_url_options[:host])
  end

  def self.default_url_options
    ActionMailer::Base.default_url_options
  end
end
