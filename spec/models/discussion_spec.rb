require 'rails_helper'

describe Discussion do
  context '#touch' do
    it 'updates the subscriptions' do
      discussion = create(:discussion)
      subscription = double('Subscription', new_comment: true)
      subscriber = double('subscriber', subscribe: [subscription])
      allow(Subscriber).to receive(:for_discussion).and_return(subscriber)

      discussion.touch

      expect(subscriber).to have_received(:subscribe)
      expect(subscription).to have_received(:new_comment)
    end
  end
end
