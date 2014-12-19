class SubscriptionsController < ApplicationController
  def update
    subscription = Subscription.for(discussion_id: params[:discussion_id], user_id: current_user.id)
    authorize! :update, subscription

    subscription.make_viewed

    render head: 200
  end
end
