import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by' 

class SearchList extends Component {
	state = {
		query: "",
		searchResults: [],
	}

	//Uupdates state based on user input in the search field
	updateQuery = (query) => {
		this.setState({ query: query})
		this.props.filterMarkers(query);
	}

	displayListMarker = (location) => {
		console.log('li clicked');
		/*if(location.title === this.props.marker.title) {
			this.showInfo()
		}*/
	}

	render() {
		const { query } = this.state
		let details = this.props.brewery
		let locations

		if(query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			locations = details.filter((brewery) => match.test(brewery.title))
		} else {
			locations = details
		}

		if(this.props.filteredMarkers) {

		}

		return (
		  	<section id="search-list">
				<div id="filter-list">
					<div>
						<input tabIndex='0' type="text" placeholder="Search for a brewery"
						value={query}
						onChange={(event) => this.updateQuery(event.target.value)}
						/>
						<button tabIndex='0' id='search'>Search</button>
					</div>

					<ol className='brewery-list'>
						{locations.map((breweries) => 
							<li tabIndex='0' onClick={this.displayListMarker} className='list-items' key={breweries.id}>
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