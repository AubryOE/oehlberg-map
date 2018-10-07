import React, { Component } from 'react';
import DisplayMap from './DisplayMap'
import SearchList from './SearchList'
import './App.css';

class MapApp extends Component {
  state = {
    locationList: [
    {id: 'szgg34', title: 'Heirloom Rustic Ales', location: {lat: 36.160381, lng: -95.961035}},
    {id: '56hdfk', title: 'Renaissance Brewery Co.', location: {lat: 36.146530, lng: -95.958020}},
    {id: 'k49pgk', title: 'Cabin Boys', location: {lat: 36.151678, lng: -95.966637}},
    {id: 'j34uid', title: 'American Solera', location: {lat: 36.137874, lng: -96.046642}},
    {id: 'wi793j', title: 'Marshall Brewing Company', location: {lat: 36.152043, lng: -95.965516}}
    ]
  }




  render() {
    return (
      <div className="App">
        <nav className="App-header">
          <h1 className='page-title'>Neighborhood Map Nav</h1>
        </nav>
            <div className='main-section'>
                <SearchList
                  brewery={this.state.locationList}
                />
                <DisplayMap
                  brewery={this.state.locationList}
                />
            </div>

      </div>
    );
  }
}

export default MapApp;
