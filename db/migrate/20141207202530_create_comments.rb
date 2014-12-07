class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.references :author, null: false
      t.references :discussion, null: false

      t.timestamps
    end
    add_foreign_key :comments, :discussions, on_delete: :cascade
  end
end
