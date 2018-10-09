import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by' 

class SearchList extends Component {
	state = {
		query: "",
		searchResults: [],
		//searchListOpen = false
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
	}

	render() {
		console.log(this.props.brewery)
		const { query } = this.state
		let details = this.props.brewery
		let locations
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
							<li className='list-items' key={breweries.id}>
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