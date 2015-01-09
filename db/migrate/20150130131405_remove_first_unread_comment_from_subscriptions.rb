class RemoveFirstUnreadCommentFromSubscriptions < ActiveRecord::Migration
  def change
    remove_column :subscriptions, :first_unread_comment_id, :integer
  end
end
