import React, { Component } from 'react';

class SearchList extends Component {
	state = {
		query: "",
		searchResults: [1, 2, 3, 4, 5]
	}

	//Function updates state based on user input in the search field, then calls findBooks
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
		const { query } = this.state
		return (
		  	<section id="search-list">
				<div id="filter-list">
					<input type="text" placeholder="Search for a brewery"
					value={query}
					onChange={(event) => this.updateQuery(event.target.value)}
					/>
				</div>
			</section>
		  )		
	}
}
export default SearchList