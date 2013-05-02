class CommentsController < ApplicationController
	def index
		comments = Identification.find(params[:identification_id]).comments
	end

	def show

	end

	def create
		comments = Comment.all

	end
end
