PI.Collections.Specimens = Backbone.Collection.extend({
	model: PI.Models.Specimen,
	url: "/specimens",
	markerValues: function() {
		return this.map(function(specimen) {
			return specimen.markerValue();
		});
	}
})