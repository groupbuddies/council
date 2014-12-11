class SessionsController < Devise::SessionsController
  skip_authorization_check
  layout 'log_in'
end
