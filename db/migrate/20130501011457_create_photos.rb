class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.references :specimen
      t.string :file_path
      t.integer :file_size
      t.string :file_name

      t.timestamps
    end
    add_index :photos, :specimen_id
  end
end
