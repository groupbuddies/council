require 'rails_helper'

describe Subscription, type: :model do

  context '.create' do
    context "Subscription of the discussions's author" do
      it 'sets the initial state to :read' do
        author = create(:author)
        discussion = create(:discussion, author: author)
        subscription = create(:subscription, discussion: discussion, user: author)

        expect(subscription).to be_read
      end
    end

    context 'Subscription of a user who did not author the discussion' do
      it 'sets the initial state to :new' do
        author = create(:user)
        user = create(:user)
        subscription = create(:subscription, author: user)

        expect(subscription).to be_read
      end
    end
  end
end
