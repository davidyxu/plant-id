// PI.Views.SpecimenNewView = Backbone.View.extend({
// 	initialize: function() {
// 		this.baseContent = JST["specimens/new2"]();

// 		this.$submit = $('<a href="#" class="btn btn-large btn-block btn-inverse">Submit</a>');
// 		this.$submit.addClass("submit-specimen");

// 		this.uploadedImages = [];
// 		this.taxonomyFormView = new PI.Views.TaxonomyView();
// 	},

// 	events: {
// 		'click a.submit-specimen': 'submit'
// 	},

// 	render: function() {
// 		var that = this;

// 		that.$el.html(that.baseContent);
// 		$('.taxonomy-prompt').html(that.taxonomyFormView.render().el);
// 		that.uploadMapView = new PI.Views.UploadMapView();
// 		$('.map-container').append(that.uploadMapView.render().$el);
// 		$('.submit-container').append(that.$submit);
// 		return that;
// 	},

// 	submit: function() {
// 		//uploadStoredFiles();
// 		var that = this;

// 		console.log("submitted");
// 		if (that.uploadMapView) {
// 			var position = that.uploadMapView.getPosition();
// 			var taxonomyValue = this.taxonomyFormView.getVal();
// 			var newSpecimen = new PI.Models.Specimen({
// 				title: this.$('.title').val(),
// 				description: this.$('.description').val(),
// 				lat: position.lat(),
// 				lng: position.lng(),
// 				family_id: taxonomyValue.family_id,
// 				genus_id: taxonomyValue.genus_id,
// 				species_id: taxonomyValue.species_id
// 			});
// 		}

// 		newSpecimen.save({}, {success: function() {
// 			PI.Store.manualUploader.setParams({
// 				specimen_id: newSpecimen.id,
// 				authenticity_token: $('meta[name="csrf-token"]').attr('content')
// 			});
// 			PI.Store.manualUploader.uploadStoredFiles();
// 		}});
		
// 		console.log(newSpecimen);
// 	}
// })



PI.Views.SpecimenNewView = Backbone.View.extend({
	initialize: function() {
		this.$submit = $('<a class="btn btn-large btn-block btn-inverse">Submit</a>');
		this.$submit.addClass("submit-specimen");

		this.$menu = $("<div></div>");
		this.$menu.addClass('filter-menu');

		this.$mapContainer = $("<div></div>")
		this.$mapContainer.addClass('viewer');

		this.$el.append(this.$menu);
		this.$el.append(this.$mapContainer);

		this.uploadedImages = [];
		this.taxonomyFormView = new PI.Views.TaxonomyView();
	},

	events: {
		'click a.submit-specimen': 'submit'
	},

	render: function() {
		var that = this;
		var renderedContent = JST["specimens/new"]({});
		that.$menu.html(renderedContent);



		that.$menu.append("<p>Please enter following fields to the best of your knowledge:</p>")
		that.$menu.append(that.taxonomyFormView.render().el);
		that.uploadMapView = new PI.Views.UploadMapView();
		that.$mapContainer.html(that.uploadMapView.render().$el);
		that.$menu.append(that.$submit);
		return that;
	},

	submit: function() {
		//uploadStoredFiles();
		var that = this;
		console.log

		console.log("submitted");
		if (that.uploadMapView) {
			var position = that.uploadMapView.getPosition();
			var taxonomyValue = this.taxonomyFormView.getVal();
			var newSpecimen = new PI.Models.Specimen({
				title: this.$('#specimen-title').val(),
				description: this.$('#specimen-description').val(),
				lat: position.lat(),
				lng: position.lng(),
				family_id: taxonomyValue.family_id,
				genus_id: taxonomyValue.genus_id,
				species_id: taxonomyValue.species_id,
				date: this.$('input#seendate').val()
			});
		}

		newSpecimen.save({}, {
			success: function() {
				PI.Store.manualUploader.setParams({
					specimen_id: newSpecimen.id,
					authenticity_token: $('meta[name="csrf-token"]').attr('content')
				});
				PI.Store.manualUploader.uploadStoredFiles();
				window.location.hash = 'specimens/' + newSpecimen.id;
			},
			error: function(model, response) {
				console.log("failed");
				errors = jQuery.parseJSON(response.responseText)
				console.log(response);
				if (errors.description) {
					this.$('#specimen-description').addClass('error')
				}
				if (errors.date) {
					this.$('input#seendate').addClass('error')
				}
				if (response.title) {
					this.$('input#specimen-title').addClass('error')
				}
			}
		});
		
		console.log(newSpecimen);
	}
})