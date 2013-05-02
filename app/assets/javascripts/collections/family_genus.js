PI.Collections.FamilyGenus = Backbone.Collection.extend({
	initialize: function(family_id) {
		this.family_id = family_id
	},
	model: PI.Models.Genus,
	url: function() {
		return "/families/" + this.family_id + "/genus"
	},

	toAutocomplete: function() {
		return this.map(function(genus) {
			return genus.escape('name');
		});	
	}
});