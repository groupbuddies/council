class CommentsController < ApplicationController
  authorize_resource
  skip_authorize_resource only: [:update]

  def index
    render json: discussion.comments
  end

  def show
    comment = discussion.comments.find(params[:id])

    render json: comment
  end

  def create
    comment = discussion.comments.create(comment_params)

    render json: comment
  end

  def update
    comment = discussion.comments.find(params[:id])
    authorize! :update, comment

    if comment.update(comment_params)
      render json: comment
    else
      render json: { errors: comment.errors.full_messages }.to_json, status: 422
    end
  end

  private

  def discussion
    Discussion.find(params[:discussion_id])
  end

  def comment_params
    params.
      require(:comment).
      permit(:body).
      merge(author_id: current_user.id)
  end
end
