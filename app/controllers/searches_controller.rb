class SearchesController < ApplicationController
	def index
		specimens = Specimen
		specimens = specimens.where(family_id: params[:family_id]) if params[:family_id]
		specimens = specimens.where(genus_id: params[:genus_id]) if params[:genus_id]
		specimens = specimens.where("date < ?", params[:beforedate]) if params[:beforedate]
		specimens = specimens.where("date > ?", params[:afterdate]) if params[:afterdate]
		render :json => specimens.all.to_json(
			:include => {
				:family => { :only => :name },
				:genus => { :only => :name },
				:species => { :only => :name }
			}
		)
	end
end
