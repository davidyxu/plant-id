PI.Views.SearchSpecimenView = Backbone.View.extend({
	initialize: function() {
		this.taxonomyView = new PI.Views.TaxonomyView();
	},

	render: function() {
		var that = this;
		that.$el.html(that.taxonomyView.render().el);
		return that;
	},

	events: {
		'click button.submit': 'submit'
	},

	installFilterOptions: function() {
		
	},

	submit: function() {
		// custom ajax request using this object to search controller
		//$.extend(this.taxonomyView.retrieveVal(), this.dateRangeView.retrieveVal())
	}


})