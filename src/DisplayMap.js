import React, { Component } from 'react';

//Code based on Udacity Getting Started with the APIs lessons as part of Front-End Web Development course
class DisplayMap extends Component {

	showMap = () => {
		getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDAMIaWZMd5wXulNg3v4XO61Oc1tQbNdPg&v=3&callback=initMap')
		//from tutorial 
		window.initMap = this.initMap
	}
	initMap = () => {
        let map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 36.147020, lng: -96.002110},
          zoom: 12
    	})


        let markers = []
        var infoWindow = new window.google.maps.InfoWindow();
        var mapBounds = new window.google.maps.LatLngBounds();

		for (var i = 0; i < this.props.brewery.length; i++) {
		console.log(this.props.brewery[i].location)
		  // Get the position from the location array.
		  var position = this.props.brewery[i].location;
		  console.log(this.props.brewery[i].title)
		  var title = this.props.brewery[i].title;
		  // Create a marker per location, and put into markers array.
		  let marker = new window.google.maps.Marker({
		    position: position,
		    map: map,
		    title: title,
		    animation: window.google.maps.Animation.DROP,
		    id: i
		  });
		  // Push the marker into the array of markers.
		  markers.push(marker);

		  // Function creates an infowindow when the user clicks a marker. We'll only allow
		  // one infowindow which will open at the marker that is clicked, and populate based
		  // on that markers position.
		  function createInfoWindow (marker, infowindow) {
		    // Check whether info window is already open.
		    if (infowindow.marker !== marker) {
		      infowindow.marker = marker;
		      infowindow.setContent('<div>' + marker.title + '</div>');
		      infowindow.open(map, marker);
		      // Clear marker when infowindow is closed.
		      infowindow.addListener('closeclick',function(){
		        infowindow.setMarker = null;
		      });

		    }
		  }
		  // Create an onclick event to open an infowindow at each marker. Pass in marker that was clicked (this) and the infowindow created
		  marker.addListener('click', function() {
		    createInfoWindow(this, infoWindow);
		  });
		  //Extend bounds for every marker that we make.
		  mapBounds.extend(markers[i].position);
		}
		// Extend the boundaries of the map for each marker and tell the map to fit itself to those bounds.
		map.fitBounds(mapBounds);

    // This function takes in a color and creates a new marker with the color. The icon will be 21 px wide by 34 high, have an origin
    // of 0, 0 and be anchored at 10, 34).

	}

    displayAPIMessage = () => {
        console.log('this is a place holder for loading foursquare API')
    }

    /*loadMarkers = () => {

    }*/

    componentDidMount() {
      	this.showMap()
      	this.displayAPIMessage()	
    }

	render() {

		  return (

		  	<main id="maincontent">
				<div id="map">


				</div>
			</main>
		  )		
	}
}
//Adding google maps
//Code based on tutorial by Elharony: https://www.youtube.com/watch?v=W5LhLZqj76s&list=PLBDR9JgF-I5Qz6A2TjO2bslaltdxwWy8i&index=2
function getScript(url) {
	let num = window.document.getElementsByTagName('script')[0]
	let script = window.document.createElement('script')
	script.src = url
	script.async = true
	script.defer = true
	num.parentNode.insertBefore(script, num)
}
export default DisplayMap


				//console.log(this.props.brewery)