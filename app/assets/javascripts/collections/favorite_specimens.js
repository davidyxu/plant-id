PI.Collections.FavoriteSpecimens = Backbone.Collection.extend({
	model: PI.Models.Specimen,
	url: "/favorites"
})