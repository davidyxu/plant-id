PI.Views.SearchView = Backbone.View.extend({
	events: {
		'click a.filter-option': 'filterOption',
		'click div.listed-specimen': 'viewDetails',
		'click a.view-type': 'selectView'
	},

	selectView: function() {
		this.viewType = event.target.id;
		$('.active').removeClass('active');
		$(event.target).parent().addClass('active');
		this.renderView();
	},

	filterOption: function() {
		if (event.target.id === this.open) {
			this.open = null;
		} else {
			this.open = event.target.id
		}
		this.renderMenu();
	},

	viewDetails: function() {
		var specimen_id = event.target.id;
		if (!specimen_id) {
			specimen_id = $(event.target).closest('div').attr('id')
		}
		window.location='#specimens/' + specimen_id;
	},

	initialize: function() {
		var that = this;

		that.viewType = "map-view";
		that.open = null;

		this.renderedContent = JST["menus/filter"]();
		this.dateFormView = JST["menus/date"]();
		this.mapResultsView = new PI.Views.MapResultsView();

		this.listenTo(PI.Store.search, 'change', function() {
			PI.Store.specimensSearch.fetch({
				success: function() {
					that.mapResultsView.loadMarkers();
				}
			});
		});

		this.descriptionFormView = JST["menus/description"]();
		this.taxonomyFormView = new PI.Views.TaxonomyView();
		this.taxonomySpecificity = JST["menus/specificity"]();

	},

	render: function() {
		var that = this;

		that.$el.html(that.renderedContent);

		that.renderMenu();
		that.renderView();
		return that;
	},

	renderMenu: function() {
		var that = this;
		that.$('.taxonomy-filter').html('');
		that.$('.date-filter').html('');
		that.$('.description-filter').html('');
		switch (that.open) {
			case "taxonomy":
				that.$('.taxonomy-filter').html(that.taxonomyFormView.render().el);
				that.$('.taxonomy-filter').append(that.taxonomySpecificity);
				break;
			case "date":
				that.$('.date-filter').html(that.dateFormView);
				break;
			case "description":
				that.$('.description-filter').html(that.descriptionFormView);
				break;
		}
	},


	renderView: function() {
		var that = this;
		if (that.viewType === "map-view") {
			console.log("awatata");
			that.$('.map-container').html(that.mapResultsView.render().el);
		} else {
			specimenListView = new PI.Views.SpecimenListView();
			that.$('.map-container').html(specimenListView.render().el);
		}
		console.log($('.map-container').html())
	}
});