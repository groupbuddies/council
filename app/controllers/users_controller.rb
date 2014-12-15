class UsersController < ApplicationController
  authorize_resource

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      respond_with_success
    else
      respond_with_error
    end
  end

  private

  def respond_with_success
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { render json: @user }
    end
  end

  def respond_with_error
    respond_to do |format|
      format.html do
        flash[:error] = @user.errors.full_messages.to_sentence
        render :edit
      end
      format.json { render json: { error: @user.errors.full_messages }.to_json, status: 422 }
    end
  end

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
