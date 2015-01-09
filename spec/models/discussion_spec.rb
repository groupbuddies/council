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
    it 'notifies all users' do
      allow(Notification).to receive(:new_discussion)

      create(:discussion)

      expect(Notification).to have_received(:new_discussion)
    end
  end
end
