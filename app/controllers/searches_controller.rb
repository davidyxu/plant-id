class SearchesController < ApplicationController
	def index
		specimens = Specimen
		specimens = specimens.where(family_id: params[:family_id]) if params[:family_id]
		specimens = specimens.where(genus_id: params[:genus_id]) if params[:genus_id]
		render :json => specimens.all
	end
end
