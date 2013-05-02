class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.references :user
      t.text :content
      t.references :identification
      t.integer :parent_id

      t.timestamps
    end
    add_index :comments, :user_id
    add_index :comments, :parent_id
    add_index :comments, :identification_id
  end
end
