require 'rails_helper'

describe User do
  context '#display_name' do
    context 'username exists' do
      it 'shows username' do
        expected_username = "user 1"
        user = User.new(username: expected_username)

        display_name = user.display_name

        expect(display_name).to eq expected_username
      end
    end

    context 'username does not exist' do
      it 'does not shows username' do
        expected_first_name = "user"
        expected_last_name = "1"
        user = User.new(first_name: expected_first_name, last_name: expected_last_name)
        
        display_name = user.display_name

        expect(display_name).to eq "#{expected_first_name} #{expected_last_name[0]}"
      end
    end
  end
end