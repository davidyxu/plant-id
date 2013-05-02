class SpecimensController < ApplicationController
	include SpecimensHelper
	def index
		specimen = Specimen
		specimen = specimen.order("created_at ASC")
		specimen = specimen.page(params[:page]) if params[:page]
		render :json => specimen.all
	end

	def create
		specimen = Specimen.new(params[:specimen])
		specimen.user_id = current_user.id
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
