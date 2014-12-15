require 'rails_helper'

describe Comment do
  context '#save' do
    it 'touches the discussion' do
      comment = build(:comment)
      discussion = double('Discussion', touch: true, persisted?: true)
      allow(comment).to receive(:discussion).and_return(discussion)

      comment.save

      expect(discussion).to have_received(:touch)
    end
  end
end
