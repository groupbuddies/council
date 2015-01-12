require 'rails_helper'

RSpec.describe CommentsController, type: :controller do
  context 'POST /discussions/:id/comments' do
    it 'notifies other subscribed users' do
      author = create(:user)
      commenter = create(:user)
      sign_in commenter
      discussion = create(:discussion, author: author)

      post :create, discussion_id: discussion.id, comment: { body: 'a comment' }

      expect(Subscription.for(user_id: author.id, discussion_id: discussion.id)).to be_unread
    end
  end
end
