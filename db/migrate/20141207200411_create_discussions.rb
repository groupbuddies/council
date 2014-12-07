class CreateDiscussions < ActiveRecord::Migration
  def change
    create_table :discussions do |t|
      t.string :title, null: false
      t.string :subtitle, null: false
      t.references :author, null: false
      t.text :body
      t.string :tags
      t.boolean :open, default: true, null: false

      t.timestamps
    end
  end
end
