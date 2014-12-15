require 'rails_helper'

describe Subscription, type: :model do

  context '.for' do
    it 'fetches an existing subscription' do
      subscription = create(:subscription)

      expect(Subscription.for(discussion: subscription.discussion, user: subscription.user)).to eq subscription
    end

    it "creates a subscription when one doesn't exist" do
      user = create(:user)
      discussion = create(:discussion)

      Subscription.for(user: user, discussion: discussion)

      expect(Subscription.count).to be(1)
    end
  end

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
        discussion = create(:discussion, author: create(:user))
        subscription = create(:subscription, discussion: discussion, user: create(:user))

        expect(subscription).to be_new
      end
    end
  end

  context '#view' do
    context 'A new discussion' do
      it 'changes to unwatch' do
        subscription = create(:subscription, state: :new)

        subscription.view

        expect(subscription).to be_unwatched
      end
    end

    context 'A read discussion' do
      it 'remains read' do
        subscription = create(:subscription, state: :read)

        subscription.view

        expect(subscription).to be_read
      end
    end

    context 'An unread discussion' do
      it 'changes to read' do
        subscription = create(:subscription, state: :unread)

        subscription.view

        expect(subscription).to be_read
      end
    end
  end

  context '#unwatch' do
    context 'A read discussion' do
      it 'changes to unwatch' do
        subscription = create(:subscription, state: :read)

        subscription.unwatch

        expect(subscription).to be_unwatched
      end
    end

    context 'An unread discussion' do
      it 'changes to unwatch' do
        subscription = create(:subscription, state: :unread) 
        subscription.unwatch

        expect(subscription).to be_unwatched
      end
    end
  end

  context '#new_comment' do
    context 'A new discussion' do
      it 'remains new' do
        subscription = create(:subscription, state: :new)

        subscription.new_comment

        expect(subscription).to be_new
      end
    end

    context 'A read discussion' do
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
    end
  end
end
