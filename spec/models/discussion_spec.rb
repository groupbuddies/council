require 'rails_helper'

describe Discussion do
  context '#touch' do
    it 'updates the subscriptions' do
      discussion = create(:discussion)
      subscription = double('subscription', new_comment: true)
      allow(Subscription).to receive(:for).and_return(subscription)

      discussion.touch

      expect(subscription).to have_received(:new_comment)
    end
  end
end
