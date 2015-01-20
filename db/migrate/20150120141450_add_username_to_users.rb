class AddUsernameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :username, :string, null: true
  end
end
