PI.Views.SpecimenTaxonomyView = Backbone.View.extend({
	render: function() {
		var that = this;
		console.log(that.model)
		var renderedContent = JST["specimens/taxonomy"]({
			specimen: that.model
		})
		that.$el.html(renderedContent);
		return that
	}
})