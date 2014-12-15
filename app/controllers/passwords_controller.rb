class PasswordsController < Devise::PasswordsController
  skip_authorization_check

  def edit
    binding.pry
  end
end
