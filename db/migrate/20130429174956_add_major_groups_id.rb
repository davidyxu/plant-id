class AddMajorGroupsId < ActiveRecord::Migration
  def change
  	add_column :families, :major_group_id, :integer
  	add_index :families, :major_group_id
	end
end
