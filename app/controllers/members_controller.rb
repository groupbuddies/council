class MembersController < ApplicationController
  def index
    authorize! :read, :members
    render json: Headquarters::Members.all
  end
end
