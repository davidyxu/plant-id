PI.Views.UploadMapView = Backbone.View.extend({
	events: {
		'click a.submit-address': 'setAddress'
	},

	initialize: function() {
		var that = this;
		console.log("derp")
		this.$map = $("<div></div>").width("600px").height("350px")
		this.$map.addClass("map");
		this.$map.gmap3({
			getgeoloc:{
		    callback : function(latLng){
		      if (latLng){
		        $(this).gmap3({
		          marker:{ 
		          	options: {
		          		draggable: true
		          	},
		            latLng:latLng
		          },
					    map:{
				        options: {
				          zoom: 10
				        }
				      }
		        });
		      } else {
		      	$(this).gmap3({
							marker:{
								options: {
									draggable: true
								},
								address: "San Francisco"
							},
					    map:{
				        options: {
				          zoom: 10
				        }
				      }
						});
		      } 
		    }
		  }
		});
		this.$mapPrompt = $("<p></p>")
		this.$mapPrompt.addClass('prompt').text("Please drag the marker, or enter an address to set the marker to desired location.");
		this.$addressForm = $("<div></div>").addClass("map-address");
		this.$addressSearch = $("<input type='text'></input>");
		this.$addressSearch.addClass('address-search');
		this.$button = $('<a href="#" class="btn btn-large btn-block btn-inverse">Set to Address</a>').addClass("submit-address");
		this.$searchError = $("<p></p>");
		this.$searchError.addClass("search-error");
		this.$addressForm.append(this.$addressSearch).append(this.$button);
	},

	setAddress: function() {
		var that = this;
    $(".map").gmap3({
		  getlatlng:{
		    address:  this.$addressSearch.val(),
		    callback: function(results){
		      if ( results ) {
		      	that.$searchError.text('');
			      $(this).gmap3({
			      	clear: {
			      		name: "marker"
			      	},
			        marker:{
			          latLng:results[0].geometry.location,
			          options: {
			        		draggable: true
			        	}
			        },
					    map:{
				        options: {
				          zoom: 10,
				          center:results[0].geometry.location
				        }
				      }
		        	
			      });
			    } else {

			    	that.$searchError.text("Failed to find a location with given address.");
			    }
		    }
		  },
		});
		that.render();
	},

	getPosition: function() {
    var marker = $('.map').gmap3({
    	get: {
    		name: "marker"
    	}
    });
    return marker.getPosition();
	},

	render: function() {
		var that = this;
		that.$el.html(this.$mapPrompt);
		that.$el.append(this.$map);
		that.$el.append(this.$addressForm)
		that.$el.append(this.$searchError);
		return that;
	}
});