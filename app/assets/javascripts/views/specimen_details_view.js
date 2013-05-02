PI.Views.SpecimenDetailView = Backbone.View.extend({
	events: {
		"click a.back": "back",
		"click a.favorite-btn": "favorite"
	},

	favorite: function() {
		var that = this;
		if (event.target.id === "favorite") {
			var favorite = new PI.Models.Favorite({specimen_id: that.model.id});
			favorite.save({}, {
				success: function() {
					PI.Store.favorites.add(favorite);
					that.render();
				}
			})
		} else {
			PI.Store.favorites.findWhere({specimen_id: that.model.id}).destroy({
				success: function() {
					that.render();
				}
			});	
		}
	},

	back: function() {
		window.history.back();
	},

	initialize: function() {

	},

	render: function() {
		var that = this;
		PI.Store.test = that.model
		console.log("lol")
		console.log(that.model)
		console.log(that.photos);
		if (PI.Store.favorites.findWhere({specimen_id: that.model.id})) {
			var favorited = true
		} else {
			var favorited = false
		}
		var renderedContent = JST["specimens/details"]({
			specimen: that.model,
			favorited: favorited
		});
		this.specimenMapView = new PI.Views.SpecimenMapView({
			model: this.model
		});
		that.$el.html(renderedContent);
		that.$el.append(that.specimenMapView.render().$el);
		return that;
	}
});