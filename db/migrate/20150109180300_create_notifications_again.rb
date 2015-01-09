class CreateNotificationsAgain < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.references :user
      t.string :url
      t.string :text
    end
  end
end
