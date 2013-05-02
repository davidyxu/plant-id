class CreateIdentifications < ActiveRecord::Migration
  def change
    create_table :identifications do |t|
      t.references :user
      t.references :specimen
      t.text :content
      t.references :family
      t.references :genus
      t.references :species
      t.integer :votes

      t.timestamps
    end
    add_index :identifications, :user_id
    add_index :identifications, :specimen_id
    add_index :identifications, :family_id
    add_index :identifications, :genus_id
    add_index :identifications, :species_id
  end
end
