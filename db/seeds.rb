# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# contents = File.readlines('script/family.txt')
# contents.map! {|family| family.chomp }
# contents.each { |family| Family.create!(name: family)}


MajorGroup.transaction do
	MajorGroup.create(name: "Angiosperms")
	MajorGroup.create(name: "Gymnosperms")
	MajorGroup.create(name: "Pteridophytes")
	MajorGroup.create(name: "Bryophytes")
end

Dir.glob('plants/*.csv') do |file|
	puts "parsing #{file}"
	contents = File.readlines(file)
	species = contents.map {|species| species.chomp }
	species.map! {|entry| entry.split(",")}
	species.map! {|entry| [entry[2], entry[4], entry[6][1..-2]]}
	species = species[1..-1]
	# File.open("plants/json/#{species[0][0]}.json", 'w') { |file| file.puts(species.to_json) }

	species.each do |entry|
		family = Family.find_by_name(entry[0])
		if family.nil?
			family = Family.create(name: entry[0], major_group_id: 1)
		end
		genus = Genus.find_by_name(entry[1])
		if genus.nil?
			genus = Genus.create(name: entry[1], family_id: family.id)
		end
		species = Species.find_by_name(entry[2])
		if species.nil?
			species = Species.create(name: entry[2], genus_id: genus.id)
		end
	end

end
