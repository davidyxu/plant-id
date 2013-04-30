PI.Views.SpecimenNewView = Backbone.View.extend({
	initialize: function() {
		this.$submit = $('<a href="#" class="btn btn-large btn-block btn-inverse">Submit</a>');
		this.$submit.addClass("submit-specimen");

		this.$menu = $("<div></div>");
		this.$menu.addClass('filter-menu');

		this.$mapContainer = $("<div></div>")
		this.$mapContainer.addClass('map-container');

		this.$el.append(this.$menu);
		this.$el.append(this.$mapContainer);

		this.taxonomyFormView = new PI.Views.TaxonomyView();
	},

	events: {
		'click a.submit-specimen': 'submit'
	},

	render: function() {
		var that = this;
		var renderedContent = JST["specimens/new"]();
		that.$menu.html(renderedContent);
		that.$menu.append("<p>Please enter following fields to the best of your knowledge:</p>")
		that.$menu.append(that.taxonomyFormView.render().el);
		that.uploadMapView = new PI.Views.UploadMapView();
		that.$mapContainer.html(that.uploadMapView.render().$el);
		that.$menu.append(that.$submit);
		return that;
	},

	submit: function() {
		console.log("submitted");
		var taxonomyValue = this.taxonomyFormView.getVal();
		var newSpecimen = new PI.Models.Specimen({
			title: this.$('.title').val(),
			description: this.$('.description').val(),
			lat: this.uploadMapView.getPosition().lat(),
			lng: this.uploadMapView.getPosition().lng(),
			family_id: taxonomyValue.family_id,
			genus_id: taxonomyValue.genus_id,
			species_id: taxonomyValue.species_id
		});

		newSpecimen.save();
		
		console.log(newSpecimen);
	}
})