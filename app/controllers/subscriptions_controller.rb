class SubscriptionsController < ApplicationController
  def update
    discussion = Discussion.find(params[:discussion_id])
    subscription = Subscription.for(discussion: discussion, user: current_user)
    authorize! :update, subscription

    subscription.view

    render json: discussion
  end
end
