import React, { Component } from 'react';
import SearchList from './SearchList'

//Code based on Udacity Getting Started with the APIs lessons as part of Front-End Web Development course
class DisplayMap extends Component {
	state = {
		markers: []
	}
	showMap = () => {
		getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDAMIaWZMd5wXulNg3v4XO61Oc1tQbNdPg&v=3&callback=initMap')
		//from tutorial 
		window.initMap = this.initMap
	}



	initMap = () => {
        let map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 36.147020, lng: -96.002110},
          zoom: 5,
          mapTypeControl: false
    	})


        let infoWindow = new window.google.maps.InfoWindow();
        let mapBounds = new window.google.maps.LatLngBounds();

		for (var i = 0; i < this.props.brewery.length; i++) {
		/*console.log(this.props.brewery[i].location)*/
		  // Get the position from the location array.
		  let position = this.props.brewery[i].location;
		  /*console.log(this.props.brewery[i].title)*/
		  let title = this.props.brewery[i].title;
		  // Create a marker per location, and put into markers array.
		  let marker = new window.google.maps.Marker({
		    position: position,
		    map: map,
		    title: title,
		    animation: window.google.maps.Animation.DROP,
		    id: i
		  });
		  // Push the marker into the array of markers.
		  this.state.markers.push(marker);
		  /*let newMarkerArray = this.state.markers.push(marker)*/

		  /*// Function creates an infowindow when the user clicks a marker and only allows one infowindow to be open.
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
		  }*/
		  // Create an onclick event to open an infowindow at each marker. Pass in marker that was clicked (this) and the infowindow created
		  marker.addListener('click', () => {
		    this.createInfoWindow(marker, infoWindow);

		  });
		  this.displayAPIMessage();
		  //Extend bounds for every marker made.
		  mapBounds.extend(this.state.markers[i].position);
		}
		// Extend the map's boundaries for each marker and adjust map to fit inside the bounds.
		map.fitBounds(mapBounds);

 	}

 	displayAPIMessage = () => {
 	    console.log('this is a place holder for loading foursquare data')
 	}
 	// Function creates an infowindow when the user clicks a marker and only allows one infowindow to be open.
 	createInfoWindow = (marker, infowindow, map) => {
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
 	displayListInfo = () => {
 		console.log('li clicked')
		let listBlock = document.getElementsByClassName('list-items')
 		
 		console.log(this.props.infoWindow)
 	}


    /*loadMarkers = () => {

    }*/

    componentDidMount() {
      	this.showMap()
	
    }

	render() {
		/*let listBlock = document.getElementsByClassName('list-items')
		listBlock.addListener('click', () => {
			console.log('li clicked')
			this.createInfoWindow(marker, infoWindow)
		}*/
		//TODO: create new markerarray, then call function and pass in the new array. 
		let newMarkerArray = this.state.markers.map((marker))
		
		this.props.displayListMarkers(newMarkerArray);
		console.log(this.props.displayListMarkers(newMarkerArray));
 		
		  return (

		  	<main id="main-content">
				<div id="map">
					createMarkers={this.displayListMarkers}
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