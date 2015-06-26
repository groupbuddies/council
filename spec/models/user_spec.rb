require 'rails_helper'

describe User do
  context '#display_name' do
    context 'username exists' do
      it 'shows username' do
        user = create(:user)

        expect(user.display_name).to eq user.username
      end
    end

    context 'username does not exist' do
      it 'does not show username' do
        user = create(:user, username: nil)
        expected_display_name = "#{user.first_name} #{user.last_name}"

        expect(user.display_name).to eq expected_display_name
      end

      context 'last name does not exist' do
        it 'shows only the first name' do
          user = create(:user,
            username: nil,
            last_name: nil)

          expect(user.display_name).to eq user.first_name
        end
      end
    end
  end

  context '#initials' do
    context 'last name exists' do
      it 'shows the first letters of the first and last names' do
        user = create(:user, first_name: 'John', last_name: 'Doe')

        expect(user.initials).to eq 'JD'
      end
    end

    context 'last name does not exist' do
      it 'shows the first two letters of the first name' do
        user = create(:user, first_name: 'John', last_name: nil)

        expect(user.initials).to eq 'Jo'
      end
    end
  end

  context '#color' do
    it 'is in RGB format' do
      user = create(:user)

      expect(user.color).to match(/#[0-9a-f]{6}/i)
    end

    context 'color exists' do
      it 'shows color' do
        user = create(:user, color: '#0000ff')

        expect(user.color).to eq '#0000ff'
      end

      it 'is valid' do
        user = create(:user, color: '#0000ff')

        expect(user).to be_valid
      end
    end

    context 'color does not exist' do
      it 'shows some default color' do
        user = create(:user, color: nil)

        expect(user.color).to match(/#[0-9a-f]{6}/i)
      end

      it 'is valid' do
        user = create(:user, color: nil)

        expect(user).to be_valid
      end
    end
  end
end
