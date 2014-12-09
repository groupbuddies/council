class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.references :user
      t.references :discussion
      t.string :state

      t.timestamps
    end

    drop_table :notifications
  end
end
