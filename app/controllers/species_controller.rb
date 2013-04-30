class SpeciesController < ApplicationController
	def index
		species = Species
		species = species.where(genus_id: params[:genus_id]) if params[:genus_id]
		render :json => species.all
	end
end
