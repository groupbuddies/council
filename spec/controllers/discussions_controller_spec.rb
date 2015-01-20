require 'rails_helper'

RSpec.describe DiscussionsController, type: :controller do
  let(:user) { create(:user) }

  before(:each) do
    @request.env['devise.mapping'] = Devise.mappings[:user]
    sign_in user
  end

  context 'POST /discussions' do
    it 'adds tags to discussion' do
      params_list = { title: 'title', subtitle: 'subtitle', body: 'body', tag_list: 'tag1, tag2, tag3' }

      post :create, discussion: params_list

      expect(response).to be_success
    end
  end
end
