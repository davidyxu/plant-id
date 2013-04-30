# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130429175156) do

  create_table "families", :force => true do |t|
    t.text    "name"
    t.integer "major_group_id"
  end

  add_index "families", ["major_group_id"], :name => "index_families_on_major_group_id"

  create_table "genus", :force => true do |t|
    t.string  "name"
    t.integer "family_id"
  end

  add_index "genus", ["family_id"], :name => "index_genus_on_family_id"

  create_table "identifications", :force => true do |t|
    t.integer  "user_id"
    t.integer  "specimen_id"
    t.integer  "family_id"
    t.string   "genus"
    t.string   "references"
    t.integer  "species_id"
    t.string   "comment"
    t.integer  "votes"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "identifications", ["family_id"], :name => "index_identifications_on_family_id"
  add_index "identifications", ["species_id"], :name => "index_identifications_on_species_id"
  add_index "identifications", ["specimen_id"], :name => "index_identifications_on_specimen_id"
  add_index "identifications", ["user_id"], :name => "index_identifications_on_user_id"

  create_table "major_groups", :force => true do |t|
    t.string "name"
  end

  create_table "species", :force => true do |t|
    t.string  "name"
    t.integer "genus_id"
  end

  add_index "species", ["genus_id"], :name => "index_species_on_genus_id"

  create_table "specimen", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "family_id"
    t.integer  "genus_id"
    t.integer  "species_id"
    t.date     "date"
    t.decimal  "lat"
    t.decimal  "lng"
    t.integer  "user_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "specimen", ["family_id"], :name => "index_specimen_on_family_id"
  add_index "specimen", ["genus_id"], :name => "index_specimen_on_genus_id"
  add_index "specimen", ["species_id"], :name => "index_specimen_on_species_id"
  add_index "specimen", ["user_id"], :name => "index_specimen_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "email"
    t.string   "username"
    t.string   "password_digest"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

end
