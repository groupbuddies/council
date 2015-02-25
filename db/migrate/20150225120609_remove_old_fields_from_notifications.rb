class RemoveOldFieldsFromNotifications < ActiveRecord::Migration
  def change
    remove_column :notifications, :text, :string
    remove_column :notifications, :url, :string
  end
end
