module Subscribable
  def status
    Subscription.for(discussion_id: object.id, user_id: scope.id).state
  end
end
