class NotificationsMailer < ActionMailer::Base
  default 'app_name' => 'Council'
  default from: 'hq@groupbuddies.com'

  def new_notification(notification_id)
    @notification = Notification.where(id: notification_id).first

    mail to: @notification.email, subject: "[Council] #{@notification.text}"
  end
end
