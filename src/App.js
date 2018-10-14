import React, { Component } from 'react';
import DisplayMap from './DisplayMap'
import SearchList from './SearchList'
import './App.css';
import SquareAPI from './PlacesAPI'
import escapeRegExp from 'escape-string-regexp'

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
    markers: [],
    filteredMarkers : [],
    showMarker: false
  }

  //TODO: add promise?
  showMap = () => {
    getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDAMIaWZMd5wXulNg3v4XO61Oc1tQbNdPg&v=3&callback=initMap')
    //from tutorial 
    window.initMap = this.initMap
  }

  componentDidMount(){
    this.showMap()
    //Code based on Connecting Foursquare youtube video by Forrest Walker (https://www.youtube.com/watch?v=Dj5hzKBxCBI&index=3&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP)
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

  initMap = () => {
        let map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 36.147020, lng: -96.002110},
          zoom: 12,
          mapTypeControl: false
      })
        this.createMarkers(map)
  }

  createMarkers = (map) => {
      let markers = [];
      let infoWindow = new window.google.maps.InfoWindow();
      let mapBounds = new window.google.maps.LatLngBounds();
      for (let i = 0; i < this.state.locationList.length; i++) {
        // Get the position from the location array.
        let position = this.state.locationList[i].location;
        let title = this.state.locationList[i].title;
        // Create a marker per location, and put into markers array.
        let marker = new window.google.maps.Marker({
          position: position,
          map: map,
          title: title,
          animation: window.google.maps.Animation.DROP,
          id: i
        });
        //Update state to set showMarker to true
        this.setState({showMarker: true})

        // Push the marker into the array of markers.
        let moreMarkers = [];
        markers.push(marker);
        //Make a copy of the markers array
        moreMarkers = markers.slice();
        //Display information from copy of markers array
        moreMarkers.forEach((mark) => {
          console.log(mark.title);
        })
        //************
        //TODO: Fix error: Converting circular structure to JSON...commented out to avoid below error
        //Update state with copy of markers array
        //this.setState({markers: moreMarkers})
        //************
        // Create an onclick event to open an infowindow at each marker. Pass in marker that was clicked (this) and the infowindow created
        marker.addListener('click', () => {
          this.createInfoWindow(marker, infoWindow);
        });
        //Extend bounds for every marker made.
        mapBounds.extend(markers[i].position);
      }
      // Extend the map's boundaries for each marker and adjust map to fit inside the bounds.
      map.fitBounds(mapBounds);
    }

  //TODO: Function needs to hide all markers when user types a query, so that only the marker title(s) matching the location title(s) will display. 
  /*hideMarkers = (markers) => {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
  }*/

  //Method sets showingMarkers variable equal to this.state.markers and filters array based on information from query
  filterMarkers = (query) => {
    console.log(query)
    let showingMarkers = [];
    showingMarkers = this.state.markers
    console.log(showingMarkers);
    showingMarkers.forEach((marker) => {
      console.log(marker.title);
    })
    //TODO: Fix: this.state.filteredMarkers.setvisible is not a function
    /*if(query) {
        //const matching = new RegExp(escapeRegExp(query), 'i')
        //filteredMarkers = showingMarkers.filter((brewery) => matching.test(brewery.title))
        this.setState({filteredMarkers: query})
        //this.state.filteredMarkers.setvisible(true)
      } else {
        this.setState({filteredMarkers: showingMarkers})
        //this.statefilteredMarkers.setvisible(false)
      }
      //this.createInfoWindow(filteredMarkers)*/
  
  //TODO: Fix error: showingMarkers.filter is not a function
  //Code based on Neighborhood Map Walkthrough tutorial by Ryan Waite (https://www.youtube.com/watch?v=LvQe7xrUh7I&t=3837s&index=6&list=PLKC17wty6rS1XVZbRlWjYU0WVsIoJyO3s)
    let newFilteredMarkers = query ? showingMarkers.filter((location) => location.title.toLowerCase().includes(query.toLowerCase)) : showingMarkers
      this.setState({filteredMarkers: query})
      newFilteredMarkers.forEach(anotherMarker => {
        anotherMarker.toLowerCase().includes(query.toLowerCase) ?
        anotherMarker.setvisible(true) :
        anotherMarker.setvisible(false);
      })
      this.setState({filteredMarkers: newFilteredMarkers})
  }
  
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
  //Hides/Displays list of places when user clicks on hamburger menu
  changeMenu = (showMenu) => {
    console.log('nav button clicked');
    console.log(this.state.showMenu);
    this.setState(state => ({showMenu: !state.showMenu}))
  }

  //Hamburger menu based on code provided by Udacity for Hometown App, Part 3
  render() {
    return (
      <div className="App">
        <nav className="App-header">
          <h1 className='page-title'>
            Neighborhood Map
          </h1>
          <a tabindex='0' onClick={this.changeMenu} id='menu' className='nav-menu'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
            </svg>
          </a>
        </nav>
        {JSON.stringify(this.state)}
            <main className='main-section'>
                <div id="map">
                </div>
                {this.state.showMenu ? 
                  <SearchList
                    brewery={this.state.locationList}
                    showMenu={this.state.showMenu}
                    markers={this.state.markers}
                    createMarkers={this.createMarkers}
                    createInfoWindow={this.createInfoWindow}
                    filterMarkers={this.filterMarkers}
                    filteredMarkers={this.state.filteredMarkers}
                  /> : null}
                {/*<DisplayMap
                  brewery={this.state.locationList}
                  markers={this.state.markers}
                  displayListMarkers={this.displayListMarkers}
                  createMarkers={this.createMarkers}
                  createInfoWindow={this.createInfoWindow}
                  initMap={this.initMap}
                />*/}
            </main>
      </div>
    );
  }
}
//Adding google maps; Code based on tutorial by Elharony: https://www.youtube.com/watch?v=W5LhLZqj76s&list=PLBDR9JgF-I5Qz6A2TjO2bslaltdxwWy8i&index=2
function getScript(url) {
  let num = window.document.getElementsByTagName('script')[0]
  let script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  num.parentNode.insertBefore(script, num)
}
export default MapApp;
