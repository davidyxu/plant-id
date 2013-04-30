class CreateSpecies < ActiveRecord::Migration
  def change
    create_table :species do |t|
      t.string :name
      t.references :genus
    end
    add_index :species, :genus_id
  end
end
