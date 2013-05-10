PI.Views.SpecimenGalleryView = Backbone.View.extend({
	render: function() {
		var that = this;
		var renderedContent = JST["specimens/gallery"]({
			specimen: that.model
		});
		that.$el.html(renderedContent);
		return that
	}
})