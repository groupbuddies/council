class UsersController < ApplicationController
  authorize_resource

  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
  end
end
