class AddsCommentIdToSubscriptions < ActiveRecord::Migration
  def change
    add_column :subscriptions, :comment_id, :integer
  end
end
