class ChangeSubscriptionCommentToFirstUnreadComment < ActiveRecord::Migration
  def change
    rename_column :subscriptions, :comment_id, :first_unread_comment_id
  end
end
