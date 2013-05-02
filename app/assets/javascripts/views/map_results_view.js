PI.Views.MapResultsView = Backbone.View.extend({
	initialize: function() {

	},

	loadMarkers: function() {
		var that = this;
			that.$map.gmap3({
				clear: {
					name: "marker"
				}
			});
			that.$map.gmap3({
			marker: {
				values: PI.Store.specimensSearch.markerValues(),
				options: {
					draggable: false
				},
				events: {
					click: function(marker, event, context){
		        var map = $(this).gmap3("get"),
		          infowindow = $(this).gmap3({get:{name:"infowindow"}});
		        if (infowindow){
		        	if (infowindow.getMap()) {
			          infowindow.close();
		        	} else {
		          infowindow.open(map, marker);
		          infowindow.setContent(context.data);

		        	}
		        } else {
		          $(this).gmap3({
		            infowindow:{
		              anchor:marker, 
		              options:{content: context.data}
		            }
		          });
		        }
		      }
				}
			}
		})
	},


	render: function() {
		var that = this;
		this.$map = $("<div></div>").width("600px").height("350px")
		this.$map.addClass("map");
		this.$map.gmap3({
			getgeoloc:{
		    callback : function(latLng){
		      if (latLng){
		        $(this).gmap3({
					    map:{
				        options: {
						    	center: latLng,
				          zoom: 10
				        }
				      }
		        });
		      } else {
		      	$(this).gmap3({
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
		that.loadMarkers();
		that.$el.html(this.$map);
		return that;
	}	
})