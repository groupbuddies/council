require 'rails_helper'

describe Discussion do
  context '#save' do
    it 'updates the subscriptions' do
      discussion = create(:discussion)
      subscription = double('subscription', updated: true)
      allow(discussion).to receive(:subscriptions).and_return([subscription])

      discussion.save

      expect(subscription).to have_received(:updated)
    end
  end
end
