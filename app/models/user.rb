class User < ActiveRecord::Base
  devise :database_authenticatable,
    :rememberable,
    :trackable,
    :validatable,
    :recoverable

  validates :first_name, :last_name, :email, presence: true

  def display_name
    "#{first_name} #{last_name[0]}"
  end
end
