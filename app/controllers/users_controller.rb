class UsersController < ApplicationController
  authorize_resource
  skip_authorize_resource only: [:update]

  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
  end

  def me
    render json: current_user
  end

  def update
    user = User.find(params[:id])
    authorize! :update, user

    if user.update(user_params)
      render json: user
    else
      head 400
    end
  end

  private

  def user_params
    all_params = params.require(:user).permit(:username, :password, :password_confirmation, :color)
    all_params.reject do |_, value|
      value.blank?
    end
  end
end
