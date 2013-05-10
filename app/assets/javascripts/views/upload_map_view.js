PI.Views.UploadMapView = Backbone.View.extend({
	initialize: function() {
		var that = this;
		
		that.$mapPrompt=$("<p></p>")
		that.$mapPrompt.addClass('prompt').text("Please drag the marker to the location of sighting.");
		that.$map = $('.map-container');
	},

	initializeMap: function() {
		var that = this;

		that.$map.gmap3({
			clear: {
				name: "marker"
			}
		});

		that.$map.gmap3({
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
				          zoom: 10,
				          center: latLng
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
				          zoom: 10,
				          center: "San Francisco"
				        }
				      }
						});
		      } 
		    }
		  }
		});
		that.$el.html(this.$mapPrompt);
	},

	setAddress: function() {
		var that = this;
	  that.$map.gmap3({
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
			    	console.log("fail")
			    }
		    }
		  },
		});
		that.render();
	},

	getPosition: function() {
    var marker = this.$map.gmap3({
    	get: {
    		name: "marker"
    	}
    });
    return marker.getPosition();
	},

	render: function() {
		var that = this;

		PI.Store.map.show();
		that.initializeMap();
		return that;
	},

});
