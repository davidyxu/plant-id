PI.Views.SpecimenDetailView = Backbone.View.extend({
	events: {
		"click a.back": "back"
	},

	back: function() {
		window.history.back();
	},

	initialize: function() {

	},

	render: function() {
		var that = this;
		PI.Store.test = that.model
		console.log("lol")
		console.log(that.model)
		console.log(that.photos)
		var renderedContent = JST["specimens/details"]({
			specimen: that.model
		});
		this.specimenMapView = new PI.Views.SpecimenMapView({
			model: this.model
		});
		that.$el.html(renderedContent);
		that.$el.append(that.specimenMapView.render().$el);
		return that;
	}
});