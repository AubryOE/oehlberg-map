import React, { Component } from 'react';

class DisplayMap extends Component {

	showMap = () => {
		getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCgwn9s1W6XVShc118NnxKzMjSIQY6nMU0&v=3&callback=initMap')
		//from tutorial 
		window.initMap = this.initMap
	}
	initMap = () => {
        let map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 36.151678, lng: -95.966637},
          zoom: 14
    	})
    }
    componentDidMount() {
      	this.showMap()
      	
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

/*
	<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCgwn9s1W6XVShc118NnxKzMjSIQY6nMU0&v=3&callback=initMap">
    </script>
*/
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