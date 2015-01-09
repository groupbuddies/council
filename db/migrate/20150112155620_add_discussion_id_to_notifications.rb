class AddDiscussionIdToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :discussion_id, :integer
  end
end
