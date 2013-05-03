class ModifyPhotoTable < ActiveRecord::Migration
  def up
  	remove_column :photos, :file_size
  	remove_column :photos, :file_name

  	add_column :photos, :thumb_path, :string
  end

  def down
  	add_column :photos, :file_size, :integer
  	add_column :photos, :file_name, :string

  	remove_column :photos, :thumb_path, :string
  end
end
