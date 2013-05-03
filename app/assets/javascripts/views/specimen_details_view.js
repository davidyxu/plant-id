PI.Views.SpecimenDetailView = Backbone.View.extend({
	events: {
		"click a.back": "back",
		"click a.favorite-btn": "favorite",
		"click a.add-id": 'newIDForm'
	},

	newIDForm: function() {
		console.log(event.target)
		$(event.target).toggleClass("open-id-form");
		if ($(event.target).is('.open-id-form')) {
			var newIdentificationView = new PI.Views.NewIdentificationView({
				model: this.model
			});
			$('.new-form-container').append(newIdentificationView.render().$el)
		} else {
			$('.new-form-container').empty();
		}
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

		if (PI.Store.favorites.findWhere({specimen_id: that.model.id})) {
			var favorited = true
		} else {
			var favorited = false
		}
		var renderedContent = JST["specimens/details"]({
			specimen: that.model,
			favorited: favorited
		});
		that.$el.html(renderedContent)

		var specimenMapView = new PI.Views.SpecimenMapView({
			model: that.model
		});;
		that.$el.append(specimenMapView.render().$el);
		var specimenIdentifications = new PI.Collections.SpecimenIdentifications(that.model.id)
		specimenIdentifications.fetch({
			success: function() {
				var identificationsListView = new PI.Views.IdentificationsListView({
					collection: specimenIdentifications
				})
				that.$el.append(identificationsListView.render().$el)	
			}
		})
		return that;
	}
});