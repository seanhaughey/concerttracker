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
							<div className="welcome">
								<h4>Welcome {this.state.profile.nickname}</h4>
							</div>
							<div className="welcome">
								<button onClick={this.handleLogout}>Logout</button>
							</div>
						  </div>
			var login = '';
			var form = 	<div className="row form-div">
							<div className="col-md-3 entry">
								<form onSubmit={this.handleSubmit}>
									<input type="text" ref="city" placeholder="Search By City" />
									<button type="submit" className="btn btn-xs btn-primary">Submit</button>
								</form>
								<button onClick={this.handleClick} type="submit" className="btn btn-xs btn-primary">Current Location</button>
							</div>
							<div className="col-md-3 entry">
								<form onSubmit={this.handleArtistSubmit}>
									<input type="text" ref="artist" placeholder="Search By Artist" />
									<button type="submit" className="btn btn-xs btn-primary">Submit</button>
								</form>
							</div>
						</div>
		} else {
			var welcome = '';
			var login = <div className="login-box">
      						<a onClick={this.showLock}><h4>Sign In</h4></a>
    					</div>
		}
		return(
			<div>
				<nav className="navbar">
					<div className="row">
						<div className="col-md-8">
							{form}
						</div>
						<div className="col-md-1">
							<button className="btn btn-default" onClick={this.props.calendarCounter}>My Calendar</button>
						</div>
						<div className="col-md-1">
							<button className="btn btn-default" onClick={this.props.vaultCounter}>My Vault</button>
						</div>
						<div className="col-md-2">
							{login}
						</div>
						<div className="col-md-2">
							{welcome}
						</div>
					</div>
				</nav>
				
			</div>
		);
	},

	handleSubmit: function(e){
		e.preventDefault();
		this.props.onClick();
		this.props.citySearchCounter();
		var search = {
			city: this.refs.city.value.trim(),
			uid: this.state.profile.user_id
		};
		AppActions.searchCity(search);
		ReactDOM.findDOMNode(this.refs.city).value = "";
	},

	handleArtistSubmit: function(e){
		e.preventDefault();
		this.props.onClick();
		this.props.artistSearchCounter();
		var artistSearch = {
			artist: this.refs.artist.value.trim(),
			uid: this.state.profile.user_id
		};
		AppActions.searchArtist(artistSearch);
		ReactDOM.findDOMNode(this.refs.artist).value = ""
	},
	handleClick: function(e){
		e.preventDefault();
		this.props.onClick();
		this.props.citySearchCounter();
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