class CommentsController < ApplicationController
  authorize_resource

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

    if commment.update(comment_params)
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
      require(:comments).
      permit(:body).
      merge(author_id: current_user.id)
  end
end
