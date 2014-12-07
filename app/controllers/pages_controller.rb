class PagesController < ApplicationController
  def index
    authorize! :manage, :all
  end
end
