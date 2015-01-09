require 'rails_helper'

describe Comment do
  context '#create' do
    it "subscribes the user to the comment's discussion" do
      discussion = build_stubbed(:discussion)
      subscriber = double('subscriber', subscribe: true)
      allow(Subscriber).to receive(:for_discussion).and_return(subscriber)

      create(:comment, discussion: discussion)

      expect(subscriber).to have_received(:subscribe)
    end
  end
end
