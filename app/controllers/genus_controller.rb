class GenusController < ApplicationController
	def index
		genus = Genus
		genus = genus.where(family_id: params[:family_id]) if params[:family_id]
		render :json => genus.all
	end
end
