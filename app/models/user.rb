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
  validates :color, format: { with: /#[0-9a-f]{6}/i }, if: :color
  validates :color, uniqueness: true

  before_create :set_default_color

  def display_name
    username.presence || full_name
  end

  def initials
    if last_name.blank?
      first_name.slice(0, 2)
    else
      first_name.chr + last_name.chr
    end
  end

  def name=(name)
    self.first_name, self.last_name = name.split(' ', 2)
  end

  private

  def full_name
    [first_name, last_name].join(' ').strip
  end

  def set_default_color
    set_color_from_display_name if color.blank?
  end

  def set_color_from_display_name
    self.color = Colorize.rgb(display_name.gsub(/[^0-9a-zA-Z]+/, ''))
  end
end
