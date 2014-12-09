class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  check_authorization

  serialization_scope :current_user

  rescue_from CanCan::AccessDenied do |exception|
    Rails.logger.debug(exception)
    respond_to do |format|
      format.html { redirect_to new_user_session_path }
      format.json { render nothing: true, status: 403 }
    end
  end
end
