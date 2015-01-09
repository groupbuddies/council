class NotificationsController < ApplicationController
  def index
    render json: current_user.notifications
  end

  def destroy
    Notification.where(id: params[:id]).first.destroy
    head 200
  end
end
