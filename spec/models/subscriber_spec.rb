require 'rails_helper'

describe Subscriber do
  let(:discussion) { build_stubbed(:discussion) }
  let(:users) { build_stubbed_list(:user, 2) }

  context 'new discussion, no subscriptions' do
    it 'creates a subscription for each user' do
      subscriber = Subscriber.for_discussion(discussion)

      expect do
        subscriber.subscribe(users)
      end.to change { Subscription.count }.by(users.count)
    end
  end

  context 'some users already have subscriptions to discussion' do
    it 'only creates subcriptions for the users who do not have one' do
      create(:subscription, user: users.first, discussion: discussion)
      subscriber = Subscriber.for_discussion(discussion)

      expect do
        subscriber.subscribe(users)
      end.to change { Subscription.count }.by(users.count - 1)
    end
  end
end
