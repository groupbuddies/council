class User < ActiveRecord::Base
  devise :database_authenticatable,
    :rememberable,
    :trackable,
    :validatable

  validates :first_name, :last_name, :email, presence: true
end
