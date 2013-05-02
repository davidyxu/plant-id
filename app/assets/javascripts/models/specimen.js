PI.Models.Specimen = Backbone.Model.extend({
	markerValue: function() {
		var that = this;
		return {
			latLng: [that.get('lat'), that.get('lng')],
			data: "<b><a href='#specimens/" + this.id + "'>" + this.escape('title') + "</a></b><br>" + this.escape('description') 
		}
	},
	urlRoot: "/specimens"
})