class CreateSpecimen < ActiveRecord::Migration
  def change
    create_table :specimen do |t|
      t.string :title
      t.text :description
      t.references :family
      t.references :genus
      t.references :species
      t.date :date
      t.decimal :lat
      t.decimal :lng
      t.references :user

      t.timestamps
    end
    add_index :specimen, :family_id
    add_index :specimen, :genus_id
    add_index :specimen, :species_id
    add_index :specimen, :user_id
  end
end
