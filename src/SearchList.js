import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by' 
import DisplayMap from './DisplayMap'

class SearchList extends Component {
	state = {
		query: "",
		searchResults: [],
	}

	//Function updates state based on user input in the search field, then calls findPlaces
	updateQuery = (query) => {
		this.setState({ query: query})
		this.findPlaces(query);
	}

	findPlaces = (query) => {
		console.log('this is a place holder for finding some places')
		console.log(this.props.brewery)
		console.log(this.state.searchResults)
	   /* let map = new window.google.maps.Map(document.getElementById('map'), {
	      center: {lat: 36.147020, lng: -96.002110},
	      zoom: 11
		})
		// This function creates markers for each place found in the search.
		function createMarkersForLocations(places) {
		    let bounds = new window.google.maps.LatLngBounds();
		  	for (let i = 0; i < places.length; i++) {
			    let place = places[i];
			    let icon = {
			      url: place.icon,
			      size: new window.google.maps.Size(35, 35),
			      origin: new window.google.maps.Point(0, 0),
			      anchor: new window.google.maps.Point(15, 34),
			      scaledSize: new window.google.maps.Size(25, 25)
		    	};
			    // Create a marker for each place.
			    let marker = new window.google.maps.Marker({
			      map: map,
			      icon: icon,
			      title: place.title,
			      id: place.id
			    });
			}
		}*/

	}
	/*displayListInfo = () => {
		console.log('li clicked');

		console.log(this.props.infoWindow);
	}*/


	render() {
		/*console.log(this.props.brewery)*/
		const { query } = this.state
		let details = this.props.brewery
		let locations
		//let markers
		if(query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			locations = details.filter((brewery) => match.test(brewery.title))
		} else {
			locations = details
		}

		return (
		  	<section id="search-list">
				<div id="filter-list">
					<div>
						<input type="text" placeholder="Search for a brewery"
						value={query}
						onChange={(event) => this.updateQuery(event.target.value)}
						/>
						<button id='search'>Search</button>
					</div>

					<ol className='brewery-list'>
						{locations.map((breweries) => 
							<li onClick={this.props.displayListMarkers} className='list-items' key={breweries.id}>
								<div className='list-details'>
									<p className='list-title'>{breweries.title}</p>

								</div>
							</li>
						)}
					</ol>
				</div>
			</section>
		  )		
	}
}
export default SearchList