require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  let(:user) {
    create(:user)
  }

  before(:each) do
    @request.env["devise.mapping"] = Devise.mappings[:user]
    sign_in user

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
  end

 end