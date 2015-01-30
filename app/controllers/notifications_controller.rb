class NotificationsController < ApplicationController
  authorize_resource

  def index
    render json: current_user.notifications
  end

  def destroy
    subscription.make_watched

    head 200
  end

  private

  def subscription
    Subscription.where(
      discussion_id: params[:discussion_id],
      user_id: current_user.id
    ).first
  end
end
