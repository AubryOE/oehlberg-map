import React, { Component } from 'react';
import DisplayMap from './DisplayMap'
import SearchList from './SearchList'
import './App.css';
import SquareAPI from './PlacesAPI'

class MapApp extends Component {
  state = {
    locationList: [
    {id: 'szgg34', title: 'Heirloom Rustic Ales', location: {lat: 36.160381, lng: -95.961035}},
    {id: '56hdfk', title: 'Renaissance Brewery Co.', location: {lat: 36.146530, lng: -95.958020}},
    {id: 'k49pgk', title: 'Cabin Boys', location: {lat: 36.151678, lng: -95.966637}},
    {id: 'j34uid', title: 'American Solera', location: {lat: 36.137874, lng: -96.046642}},
    {id: 'wi793j', title: 'Marshall Brewing Company', location: {lat: 36.152043, lng: -95.965516}}
    ],

    showMenu: true,
    markers: []
  }

  componentDidMount(){
    SquareAPI.search({
      near: 'Tulsa, OK',
      query: 'brew',
      limit: 2
    }).then(results => {
      console.log(results);
      for(let i = 0; i < results.response.venues.length; i++) {
        if(results.response.venues[i].location.formattedAddress) {
          console.log(results.response.venues[i].location.formattedAddress)
        } else {
          console.log('No results found')
        }
      }
    })
  }

  changeMenu = (showMenu) => {
    console.log('button clicked');
    console.log(this.state.showMenu);
    this.setState(state => ({showMenu: !state.showMenu}))
    console.log(this.state);

    /*let hide = document.getElementById('search-list');
    hide.setState({class: 'hide-list'});*/
  }

  displayListMarkers = (markerArray) => {


      this.setState( {
        markers: markerArray
      })
      console.log(this.state.markers)
      console.log('li clicked');
    }

  //Hamburger menu based on code provided by Udacity for Hometown App, Part 3
  render() {
    return (
      <div className="App">
        <nav className="App-header">
          <h1 className='page-title'>
            Neighborhood Map
          </h1>
          <a onClick={this.changeMenu} id='menu' className='nav-menu'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
            </svg>
          </a>
        </nav>
            <div className='main-section'>
                {this.state.showMenu ? 
                <SearchList
                  brewery={this.state.locationList}
                  showMenu={this.state.showMenu}
                  markers={this.state.markers}
                  displayListMarkers={this.displayListMarkers}
                /> : null}
                <DisplayMap
                  brewery={this.state.locationList}
                  markers={this.state.markers}
                  displayListMarkers={this.displayListMarkers}
                />
            </div>

      </div>
    );
  }
}

export default MapApp;
