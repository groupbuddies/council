class User < ActiveRecord::Base
  devise :database_authenticatable,
    :rememberable,
    :trackable,
    :validatable

  validates :first_name, :last_name, :email, presence: true
  has_many :notifications

  def display_name
    "#{first_name} #{last_name[0]}"
  end
end
