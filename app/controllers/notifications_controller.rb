class NotificationsController < ApplicationController
  authorize_resource

  def index
    notifications = current_user.notifications

    render json: notifications
  end

  def destroy
    notification = Notification.find(params[:id])
    notification.destroy

    render json: notification
  end
end
