PI.Collections.SpecimensSearch = Backbone.Collection.extend({
	model: PI.Models.Specimen,
	initialize: function(searchModel) {
		this.searchModel = searchModel
	},
	url: function() {
		return this.searchModel.query();
	},
	markerValues: function() {
		return this.map(function(specimen) {
			return specimen.markerValue();
		});
	}
})