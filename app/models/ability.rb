class Ability
  include CanCan::Ability

  def initialize(user)
    return if user.nil?

    registered_user
  end

  def registered_user
    can :manage, :all
  end
end
