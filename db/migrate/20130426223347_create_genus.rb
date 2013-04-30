class CreateGenus < ActiveRecord::Migration
  def change
    create_table :genus do |t|
      t.string :name
      t.references :family
    end
    add_index :genus, :family_id
  end
end
