class AddCommentsCount < ActiveRecord::Migration
  def change
    add_column :discussions, :comments_count, :integer, default: 0, null: false
  end
end
