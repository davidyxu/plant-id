require 'net/http'

contents = File.readlines('script/angiosperm.txt')
families = contents.map {|family| family.chomp }


families.each do |family|
	response = Net::HTTP.get_response(URI.parse("http://www.theplantlist.org/browse/A/#{family}/#{family}.csv"))
	File.open("plants/#{family}.csv", "w") { |f| f.write(response.body)}
end

