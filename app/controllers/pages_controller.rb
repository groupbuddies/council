class PagesController < ApplicationController
  def index
    authorize! :read, :all
  end
end
