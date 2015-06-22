class AddColorIndexToUser < ActiveRecord::Migration
  def change
    add_index :users, :color, unique: true
  end
end
