class SubscribedDiscussion < Decorator
  def initialize(discussion: discussion, user: user)
    super(discussion)
    @discussion = discussion
    @user = user
  end

  def subscription_state
    subscription.state
  end

  private

  attr_reader :discussion, :user

  def subscription
    @_subscription ||= Subscription.for(discussion_id: discussion.id, user_id: user.id)
  end
end
