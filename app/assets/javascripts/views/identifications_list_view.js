PI.Views.IdentificationsListView = Backbone.View.extend({
	events: {
		'click div.list-element': 'viewIdentification',
		'mouseenter div.list-element': 'shade',
		'mouseleave div.list-element': 'unshade',
	},

	shade: function() {
		$(event.target).closest('div.list-element').addClass('shaded')
	},
	unshade: function() {
		$(event.target).closest('div.list-element').removeClass('shaded')
	},

	viewSpecimen: function() {
		var identification_id = event.target.id;
		if (!identification_id) {
			identification_id = $(event.target).closest('div.list-element').attr('id')
		}
		window.location='#identifications/' + identification_id;
	},

	render: function() {
		var that = this;
		var header = $('<h3></h3>').text('Identifications');
		that.$el.html(header);
		that.collection.each(function(model) {
			var renderedContent = JST["identifications/details"]({
				model: model
			})
			that.$el.append(renderedContent);
		});

		return that;
	}
})