class CreateIdentifications < ActiveRecord::Migration
  def change
    create_table :identifications do |t|
      t.references :user
      t.references :specimen
      t.references :family
      t.string :genus
      t.string :references
      t.references :species
      t.string :comment
      t.integer :votes

      t.timestamps
    end
    add_index :identifications, :user_id
    add_index :identifications, :specimen_id
    add_index :identifications, :family_id
    add_index :identifications, :species_id
  end
end
