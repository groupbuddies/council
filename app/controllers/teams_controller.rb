require 'hq/team'

class TeamsController < ApplicationController
  authorize_resource :hq

  def show
    render json: Hq::Team.all
  end
end
