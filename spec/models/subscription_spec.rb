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
      user = create(:user)

      subscription = Subscription.for(discussion_id: discussion.id, user_id: user.id)

      expect(subscription).to be
    end
  end

  context '.create' do
    context "user is the discussion's author" do
      it 'sets the initial state to :watching' do
        discussion = create(:discussion)
        subscription = create(:subscription, discussion: discussion, user: discussion.author, state: nil)

        expect(subscription).to be_watching
      end

      it 'does not send an email notification' do
        allow(Notification).to receive(:new_discussion)
        discussion = create(:discussion)

        create(:subscription, discussion: discussion, user: discussion.author)

        expect(Notification).not_to have_received(:new_discussion)
      end
    end

    context "user is not the discussion's author" do
      it 'sets the initial state to :unwatched' do
        discussion = create(:discussion)
        subscription = create(:subscription, discussion: discussion)

        expect(subscription).to be_unwatched
      end

      it 'sends an email notification' do
        allow(Notification).to receive(:new_discussion)

        create(:subscription)

        expect(Notification).to have_received(:new_discussion)
      end
    end
  end

  context '#make_watched' do
    context 'A new discussion' do
      it 'changes to watching' do
        subscription = create(:subscription, state: :unwatched)

        subscription.make_watched

        expect(subscription).to be_watched
      end
    end

    context 'A watching discussion' do
      it 'remains watching' do
        subscription = create(:subscription, state: :watching)

        subscription.make_watched

        expect(subscription).to be_watching
      end
    end

    context 'An unread discussion' do
      it 'changes to read' do
        subscription = create(:subscription, state: :unread)

        subscription.make_watched

        expect(subscription).to be_watching
      end

      it 'destroys all related notifications' do
        subscription = create(:subscription, state: :unread)
        create(:notification, user: subscription.user, discussion: subscription.discussion)

        subscription.make_watched

        expect(subscription.notifications.count).to be(0)
      end
    end
  end

  context '#new_comment' do
    context 'new_comment by me' do
      it 'remains read' do
        subscription = create(:subscription, state: :watching)
        create(:comment, discussion: subscription.discussion, author: subscription.user)

        subscription.new_comment

        expect(subscription).to be_watching
      end
    end

    context 'new_comment by someone else' do
      it 'changes to unread' do
        subscription = create(:subscription, state: :watching)

        subscription.new_comment

        expect(subscription).to be_unread
      end

      it 'creates a notification' do
        user = create :user
        subscription = create(:subscription, state: :watching, user: user)
        create(:comment, discussion: subscription.discussion)

        expect do
          subscription.new_comment
        end.to change { user.notifications.count }.by(1)
      end
    end

    context 'on an unwatched discussion' do
      it 'creates a new notification' do
        user = create(:user)
        subscription = create(:subscription, user: user, state: :unwatched)
        allow(Notification).to receive(:new_comment)
        create(:comment, discussion: subscription.discussion, author: user)

        subscription.new_comment

        expect(Notification).to have_received(:new_comment)
      end

      it 'changes the state to watching' do
        user = create(:user)
        subscription = create(:subscription, user: user, state: :unwatched)
        create(:comment, discussion: subscription.discussion, author: user)

        subscription.new_comment

        expect(subscription).to be_watching
      end
    end
  end
end
