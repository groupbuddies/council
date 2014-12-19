class Ability
  include CanCan::Ability

  def initialize(user)
    return if user.nil?

    @user = user
    registered_user
  end

  def registered_user
    can :read, :all
    can :manage, Discussion, author_id: user.id
    can :manage, Comment, author_id: user.id
    can :manage, User, id: user.id
    can :manage, Subscription, user_id: user.id
  end

  private

  attr_reader :user
end
