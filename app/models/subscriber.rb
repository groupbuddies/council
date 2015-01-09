class Subscriber
  def self.for_discussion(discussion)
    new(discussion)
  end

  def initialize(discussion)
    @discussion = discussion
    @subscriptions = Subscription.where(discussion_id: discussion.id)
  end

  def subscribe(users)
    users.map do |user|
      subscribe_user(user)
    end
  end

  private

  attr_reader :discussion, :subscriptions

  def subscribe_user(user)
    subscription_for_user(user) ||
      Subscription.create(user: user, discussion: discussion)
  end

  def subscription_for_user(user)
    subscriptions.find do |subscription|
      subscription.user_id == user.id
    end
  end
end
