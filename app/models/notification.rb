class Notification < ActiveRecord::Base
  belongs_to :user
  belongs_to :discussion

  validates :text, :url, :user, presence: true

  delegate :email, to: :user

  after_create :send_email

  def self.new_comment(user:, comment:)
    discussion = comment.discussion
    create(
      discussion_id: discussion.id,
      user_id: user.id,
      text: I18n.t('notifications.new_comment', author: comment.author.display_name, discussion: discussion.title),
      url: root_url(anchor: "#/discussion/#{discussion.id}/comments/#{comment.id}")
    )
  end

  def self.new_discussion(user:, discussion:)
    create(
      discussion_id: discussion.id,
      user_id: user.id,
      text: I18n.t('notifications.new_discussion', author: discussion.author, discussion: discussion.title),
      url: root_url(anchor: "#/discussion/#{discussion.id}")
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
