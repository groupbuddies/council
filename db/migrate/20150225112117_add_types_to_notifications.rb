class AddTypesToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :kind, :string
  end
end
