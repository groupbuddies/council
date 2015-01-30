require 'rails_helper'

describe Discussion do
  context '#touch' do
    it 'send a new comment notification' do
      discussion = create(:discussion)
      subscription = double('Subscription', new_comment: true)
      allow(discussion).to receive(:subscriptions).and_return([subscription])

      discussion.touch

      expect(subscription).to have_received(:new_comment)
    end
  end

  context '#create' do
    it 'subscribes all users' do
      create(:discussion)

      expect(Subscription.count).to eq 1
    end
  end
end
