class DropOldIdentification < ActiveRecord::Migration
  def up
  	drop_table :identifications
  end

  def down
  end
end
