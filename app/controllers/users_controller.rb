class UsersController < ApplicationController
  authorize_resource
  skip_authorize_resource only: [:update]

  def show
    render json: User.find(params[:id])
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
    params.require(:user).permit(:password, :password_confirmation)
  end
end
