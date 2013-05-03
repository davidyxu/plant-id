PI.Collections.SpecimenIdentifications = Backbone.Collection.extend({
	initialize: function(specimen_id) {
		this.specimen_id = specimen_id
	},
	model: PI.Models.Photo,
	url: function() {
		return "/specimens/" + this.specimen_id + "/identifications"
	}
});