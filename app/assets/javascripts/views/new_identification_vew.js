PI.Views.NewIdentificationView = Backbone.View.extend({
	initialize: function() {
		this.taxonomyFormView = new PI.Views.TaxonomyView();
	},

	events: {
		'click a.new-identification': 'submitID',
	},

	submitID: function() {
		var that = this;
		var taxonomyValue = that.taxonomyFormView.getVal();

		var newIdentification = new PI.Models.Identification({
			family_id: taxonomyValue.family_id,
			genus_id: taxonomyValue.genus_id,
			species_id: taxonomyValue.species_id,
			content: $('#id-content').val(),
			specimen_id: that.model.id
		});

		console.log(newIdentification)
		newIdentification.save({
			success: function() {

			}
		});
	},

	render: function() {
		var that = this;
		var renderedContent = JST["identifications/new"]();


		that.$el.append(renderedContent);

		that.$('.tax-form-container').html(that.taxonomyFormView.render().el);

		return that;
	},


})