PI.Models.Family = Backbone.Model.extend({
	urlRoot: "/families",

	autocomplete: function() {
		return {
			label: this.escape('name'),
			value: this.id
		}
	}
});