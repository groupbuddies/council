class DiscussionsController < ApplicationController
  authorize_resource

  def index
    discussions = Discussion.all

    render json: discussions, each_serializer: DiscussionCompactSerializer
  end

  def show
    discussion = Discussion.find(params[:id])

    render json: discussion
  end
end
