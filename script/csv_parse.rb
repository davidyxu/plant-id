require 'rubygems'
require 'json'
require ''
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
			family = Family.create(name: entry[0])
		end
		genus = Genus.find_by_name(entry[1])
		if genus.nil?
			genus = Genus.create(name: entry[1], family_id: family.id)
		end
		species = Species.find_byName(entry[2])
		if species.nil?
			species = Species.create(name: entry[2], genus_id: genus.id)
		end
	end

end
