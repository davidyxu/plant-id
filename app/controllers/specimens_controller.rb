class SpecimensController < ApplicationController
	def index
		specimen = Specimen
		render :json => specimen.all
	end

	def create
		specimen = Specimen.new(params[:specimen])
		if specimen.save
			render :json => specimen
		else
			render :json => specimen.errors, :status => 422
		end
	end

	def show
		specimen = Specimen.find(params[:id])
		render :json => specimen
	end
end
