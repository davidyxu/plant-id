PI.Views.SpecimenIdentificationView = Backbone.View.extend({
	render: function() {
		var that = this;
		var idCollection = new PI.Collections.SpecimenIdentifications(that.model.id)

		idCollection.fetch({
			success: function() {
				var identificationsView = new PI.Views.IdentificationsListView({
					collection: idCollection
				});
				that.$el.html(identificationsView.render().$el);
			}
		});
		return that;
	}
})