var React = require('react');
var ReactDOM = require('react-dom');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var SearchForm = React.createClass({

	showLock: function() {
    // We receive lock from the parent component in this case
    // If you instantiate it in this component, just do this.lock.show()
		this.props.lock.show();
	},

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
			profile: null,
			position: geo
		}
	},

	componentDidMount: function() {
    // In this case, the lock and token are retrieved from the parent component
    // If these are available locally, use `this.lock` and `this.idToken`
    	this.props.lock.getProfile(this.props.idToken, function (err, profile) {
			if (err) {
        	console.log("Error loading the Profile", err);
        	return;
		}
		this.setState({profile: profile});
		}.bind(this));
	},

	render: function(){
		if (this.state.profile) {
			var welcome = <div>
							<h2>Welcome {this.state.profile.nickname}</h2>
								<button onClick={this.handleLogout}>Logout</button>
						  </div>
			var login = '';
			var form = 	<div className="row">
							<h3>Search By City</h3>
							<form onSubmit={this.handleSubmit}>
								<input type="text" ref="city" placeholder="Enter City Name" />
								<button type="submit" className="btn btn-xs btn-primary">Submit</button>
							</form>
							<h3>Search By Artist</h3>
							<form onSubmit={this.handleArtistSubmit}>
								<input type="text" ref="artist" placeholder="Enter Artist Name" />
								<button type="submit" className="btn btn-xs btn-primary">Submit</button>
							</form>
							<button onClick={this.handleClick} type="submit" className="btn btn-sm btn-primary">Use Current Location</button>
						</div>
		} else {
			var welcome = '';
			var login = <div className="login-box">
      						<a onClick={this.showLock}>Sign In</a>
    					</div>
		}
		return(
			<div>
				{login}
    			{welcome}
				{form}
			</div>
		);
	},

	handleSubmit: function(e){
		e.preventDefault();

		var search = {
			city: this.refs.city.value.trim(),
			uid: this.state.profile.user_id
		};
		AppActions.searchCity(search);
		ReactDOM.findDOMNode(this.refs.city).value = "";
	},

	handleArtistSubmit: function(e){
		e.preventDefault();
		
		var artistSearch = {
			artist: this.refs.artist.value.trim(),
			uid: this.state.profile.user_id
		};
		AppActions.searchArtist(artistSearch);
		ReactDOM.findDOMNode(this.refs.artist).value = ""
	},
	handleClick: function(e){
		e.preventDefault();
		var geoSearch = {
			lat: this.state.position[0].coords.latitude,
			lng: this.state.position[0].coords.longitude,
			uid: this.state.profile.user_id
		};
		AppActions.searchGeo(geoSearch);
	},
	handleLogout: function(e){
		e.preventDefault();
		localStorage.removeItem('userToken');
		this.setState({profile: null});
		window.location.assign("https://haughey-react-auth.auth0.com/v2/logout?returnTo=https://concerttracker.firebaseapp.com/")
	}
});

module.exports = SearchForm;