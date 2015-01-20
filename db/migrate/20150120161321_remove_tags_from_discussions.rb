class RemoveTagsFromDiscussions < ActiveRecord::Migration
  def change
    remove_column :discussions, :tags, :string
  end
end
