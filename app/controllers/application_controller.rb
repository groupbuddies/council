class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  check_authorization

  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.html { redirect_to new_user_session_path }
      format.json { render nothing: true, status: 403 }
    end
  end
end
