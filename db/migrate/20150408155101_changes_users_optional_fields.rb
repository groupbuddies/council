class ChangesUsersOptionalFields < ActiveRecord::Migration
  def change
    change_column_null :users, :last_name, true
  end
end
