class UsersController < ApplicationController
  def edit
    @user = User.find(params[:id])
    authorize! :manage, @user
  end

  def update
    @user = User.find(params[:id])
    authorize! :manage, @user

    if @user.update(user_params)
      redirect_to root_path
    else
      flash[:error] = @user.errors.full_messages.to_sentence
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
