module SpecimensHelper
	def created_at_to_date(specimens)
		return specimens.map do |specimen|
			specimen.date = specimen.created_at.strftime("%d %b. %Y").to_s
		end
	end
end
