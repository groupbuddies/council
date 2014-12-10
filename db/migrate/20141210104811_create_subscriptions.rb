class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.references :user
      t.references :discussion
      t.string :state

      t.timestamps
    end

    drop_table :notifications

    create_table :notifications do |t|
      t.references :subscription

      t.timestamps
    end
  end
end
