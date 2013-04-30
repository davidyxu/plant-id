class CreateFamilies < ActiveRecord::Migration
  def change
    create_table :families do |t|
      t.text :name
    end
  end
end
