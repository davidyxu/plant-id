
PI.Collections.SpecimensPage = Backbone.Collection.extend({
	model: PI.Models.Specimen,
	initialize: function(page) {
		this.page = page
		this.totalPages = null
	},

	url: function() {
		return "/specimens?page=" + this.page;
	},

	markerValues: function() {
		return this.map(function(specimen) {
			return specimen.markerValue();
		});
	},

  parse: function(data) {
    this.totalPages=String(data.total_pages);
    return data.specimens;
  }
})