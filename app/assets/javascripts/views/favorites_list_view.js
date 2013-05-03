PI.Views.FavoritesListView = Backbone.View.extend({
	events: {
		'click div.list-element': 'viewSpecimen',
		'mouseenter div.list-element': 'shade',
		'mouseleave div.list-element': 'unshade',
	},

	shade: function() {
		$(event.target).closest('div.list-element').addClass('shaded')
	},
	unshade: function() {
		$(event.target).closest('div.list-element').removeClass('shaded')
	},

	viewSpecimen: function() {
		var specimen_id = event.target.id;
		if (!specimen_id) {
			specimen_id = $(event.target).closest('div.list-element').attr('id')
		}
		window.location='#specimens/' + specimen_id;
	},

	render: function() {
		var that = this;

		var header = $("<h3></h3>").text("Favorites");
		that.$el.html(header);

		var models = PI.Store.favorites.pluck('specimen');
		models = models.map(function(model) {
			return new PI.Models.Specimen(model)
		});

		var collection = new PI.Collections.FavoriteSpecimens(models);
		console.log(collection)
		collection.each(function(model) {
			var renderedContent = JST["specimens/single"]({
				model: model	
			});
			that.$el.append(renderedContent);
		})

		return that;
	}
})