class User < ActiveRecord::Base
  devise :database_authenticatable,
    :rememberable,
    :trackable,
    :validatable,
    :recoverable,
    :omniauthable,
    omniauth_providers: [:headquarters]

  has_many :notifications

  validates :first_name, :email, presence: true

  def display_name
    username.presence || full_name
  end

  def name=(name)
    self.first_name, self.last_name = name.split(' ', 2)
  end

  private

  def full_name
    [first_name, last_name].join(' ').strip
  end
end
