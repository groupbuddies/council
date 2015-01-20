class DiscussionsController < ApplicationController
  authorize_resource
  skip_authorize_resource only: [:update]

  def index
    discussions = Discussion.all

    render json: discussions
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

  def update
    discussion = Discussion.find(params[:id])
    authorize! :update, discussion

    if discussion.update(discussion_params)
      render json: discussion
    else
      render json: { errors: discussion.errors.full_messages }.to_json, status: 422
    end
  end

  private

  def discussion_params
    params.
      require(:discussion).
      permit(:title, :subtitle, :body, :tag_list, :open).
      merge(author_id: current_user.id)
  end
end
