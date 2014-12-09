class DeleteNotificationCounterCache < ActiveRecord::Migration
  def change
    remove_column :users, :notifications_count, :integer, default: 0, null: false
  end
end
