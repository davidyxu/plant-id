$(function() {

	PI.Store.map = $('.map-container').gmap3({
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
	PI.Store.map.hide = function() {
		var $map = $('.map-container');
		$map.css("position", "absolute");
		$map.css("left", "10000px");

		console.log("hide")
	};
	PI.Store.map.show = function() {
		var $map = $('.map-container');
		$map.css("position", "relative");
		$map.css("left", "0px");

		console.log("show")
	};

});
