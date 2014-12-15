class TeamsController < ApplicationController
  authorize_resource :hq

  def show
    render json: HQ::Team.all
  end
end
