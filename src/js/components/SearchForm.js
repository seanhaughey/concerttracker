var React = require('react');
var ReactDOM = require('react-dom');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var SearchForm = React.createClass({

	getInitialState: function(){
		var geo = [];
		function getLocation() {
			if (navigator.geolocation) {
    			navigator.geolocation.getCurrentPosition(showPosition);

			} else { 
    			alert("Geolocation is not supported by this browser.");
			}
		};
		function showPosition(position) {
			geo.push(position);
		};
		getLocation();
		return {
			position: geo
		}
	},

	render: function(){
		return(
			<div className="row">
				<h3>Search By City</h3>
				<form onSubmit={this.handleSubmit}>
					<input type="text" ref="city" placeholder="Enter City Name" />
					<button type="submit" className="btn btn-xs btn-primary">Submit</button>
				</form>
				<h3>Search Artist</h3>
				<form onSubmit={this.handleArtistSubmit}>
					<input type="text" ref="artist" placeholder="Enter Artist Name" />
					<button type="submit" className="btn btn-xs btn-primary">Submit</button>
				</form>
				<button onClick={this.handleClick} type="submit" className="btn btn-sm btn-primary">Use Current Location</button>
			</div>
		);
	},

	handleSubmit: function(e){
		e.preventDefault();

		var search = {
			city: this.refs.city.value.trim()
		};
		AppActions.searchCity(search);
		ReactDOM.findDOMNode(this.refs.city).value = "";
	},

	handleArtistSubmit: function(e){
		e.preventDefault();
		
		var artistSearch = {
			artist: this.refs.artist.value.trim()
		};
		AppActions.searchArtist(artistSearch);
		ReactDOM.findDOMNode(this.refs.artist).value = ""
	},
	handleClick: function(e){
		e.preventDefault();
		console.log(this.state.position);

		var geoSearch = {
			lat: this.state.position[0].coords.latitude,
			lng: this.state.position[0].coords.longitude
		};
		console.log(geoSearch);
		AppActions.searchGeo(geoSearch);
	}
});

module.exports = SearchForm;