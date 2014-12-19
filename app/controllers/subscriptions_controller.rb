class SubscriptionsController < ApplicationController
  def update
    subscription = Subscription.for(discussion_id: params[:discussion_id], user_id: current_user.id)
    authorize! :update, subscription

    subscription.view

    render nothing: true, status: 200
  end
end
