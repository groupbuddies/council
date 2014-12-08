class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.references :user
      t.references :discussion
      t.references :comment

      t.timestamps
    end
  end
end
