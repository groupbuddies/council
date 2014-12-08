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

  def create
    discussion = Discussion.create(discussion_params)

    if discussion.persisted?
      render json: discussion
    else
      render json: { errors: discussion.errors.full_messages }.to_json, status: 422
    end
  end

  private

  def discussion_params
    params.require(:discussion).permit(:title, :subtitle, :body, :tags, :author_id)
  end
end
