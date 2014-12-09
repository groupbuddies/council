class ChangesDiscussionsOptionalFields < ActiveRecord::Migration
  def change
    change_column_null :discussions, :body, false
    change_column_null :discussions, :subtitle, true
  end
end
