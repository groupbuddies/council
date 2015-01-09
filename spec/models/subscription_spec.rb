require 'rails_helper'

describe Subscription, type: :model do
  context '.for' do
    it 'returns an existing subscription' do
      discussion = create(:discussion)
      subscription = create(:subscription, discussion: discussion)

      fetched_subscription = Subscription.for(discussion_id: discussion.id, user_id: subscription.user_id)

      expect(fetched_subscription).to eq subscription
    end

    it 'creates a subscription' do
      discussion = create(:discussion)

      subscription = Subscription.for(discussion_id: discussion.id)

      expect(subscription).to be
    end
  end

  context '.create' do
    context "Subscription of the discussions's author" do
      it 'sets the initial state to :read' do
        subscription = create(:subscription, state: nil)

        expect(subscription).to be_read
      end
    end

    context 'Subscription of a user who did not author the discussion' do
      it 'sets the initial state to :read' do
        discussion = create(:discussion, author: create(:user))
        subscription = create(:subscription, discussion: discussion, user: create(:user))

        expect(subscription).to be_read
      end
    end
  end

  context '#make_read' do
    context 'A new discussion' do
      it 'changes to read' do
        subscription = create(:subscription, state: :unread)

        subscription.make_read

        expect(subscription).to be_read
      end
    end

    context 'A read discussion' do
      it 'remains read' do
        subscription = create(:subscription, state: :read)

        subscription.make_read

        expect(subscription).to be_read
      end
    end

    context 'An unread discussion' do
      it 'changes to read' do
        subscription = create(:subscription, state: :unread)

        subscription.make_read

        expect(subscription).to be_read
      end

      it 'destroys all related notifications' do
        subscription = create(:subscription, state: :unread)
        create(:notification, user: subscription.user, discussion: subscription.discussion)

        subscription.make_read

        expect(subscription.notifications.count).to be(0)
      end
    end
  end

  context '#new_comment' do
    context 'new_comment by me' do
      it 'remains read' do
        subscription = create(:subscription, state: :read)
        create(:comment, discussion: subscription.discussion, author: subscription.user)

        subscription.new_comment

        expect(subscription).to be_read
      end
    end

    context 'new_comment by someone else' do
      it 'changes to unread' do
        subscription = create(:subscription, state: :read)

        subscription.new_comment

        expect(subscription).to be_unread
      end
    end

    it 'creates a notification' do
      user = create :user
      subscription = create(:subscription, state: :read, user: user)
      create(:comment, discussion: subscription.discussion)

      expect do
        subscription.new_comment
      end.to change { user.notifications.count }.by(1)
    end
  end
end
