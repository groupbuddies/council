require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let(:user) { create(:user) }

  before(:each) do
    @request.env['devise.mapping'] = Devise.mappings[:user]
    sign_in user
  end

  context 'GET /users/:id' do
    it 'shows a color' do
      get :show, id: user.id

      expect(response.body).to include 'color'
    end
  end

  context 'GET /me' do
    it 'shows the current user' do
      get '/me'

      expect(response.body[:id]).to eq user.id
    end
  end

  context 'PATCH /users/:id' do
    it 'allows to update username' do
      new_username = 'user1'

      patch :update, user: { username: new_username }, id: user.id

      expect(user.reload.username).to eq new_username
    end

    it 'does not update blank username' do
      new_username = ''

      patch :update, user: { username: new_username }, id: user.id

      expect(user.reload.username).not_to eq new_username
    end

    it 'allows to update color' do
      new_color = '#ff0000'

      patch :update, user: { color: new_color }, id: user.id

      expect(user.reload.color).to eq new_color
    end
  end
end
