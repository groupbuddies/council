class CreateDiscussions < ActiveRecord::Migration
  def change
    create_table :discussions do |t|
      t.string :title, null: false
      t.string :subtitle, null: false
      t.text :body, null: false
      t.references :author, null: false
      t.string :tags

      t.timestamps
    end
  end
end
