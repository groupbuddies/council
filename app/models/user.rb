class User < ActiveRecord::Base
  devise :database_authenticatable,
    :rememberable,
    :trackable,
    :validatable,
    :recoverable

  validates :first_name, :last_name, :email, presence: true

  def display_name
  	username.presence || "#{first_name} #{last_name[0]}"
  end
end
