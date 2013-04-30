class CreateMajorGroups < ActiveRecord::Migration
  def change
    create_table :major_groups do |t|
      t.string :name
    end
  end
end
