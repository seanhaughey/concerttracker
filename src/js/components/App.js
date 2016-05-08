var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var SearchForm = require('./SearchForm.js');
var CitySearchResults = require('./CitySearchResults.js');
var ArtistSearchResults = require('./ArtistSearchResults.js');
var Calendar = require('./Calendar.js');
var ArtistCalendar = require('./ArtistCalendar.js');

function getAppState(){
	return {
		results: AppStore.getResults(),
		calendars: AppStore.getCalendars(),
		artistResults: AppStore.getArtistResults(),
		artistCalendars: AppStore.getArtistCalendars()
	}
};

var App = React.createClass({
	getInitialState: function(){
		return getAppState();
	},

	componentDidMount: function(){
		AppStore.addChangeListener(this._onChange);
	},

	componentUnmount: function(){
		AppStore.removeChangeListener(this._onChange);
	},

	render: function(){
		return(
			<div>
				<SearchForm />
				<CitySearchResults searchText={this.state.searchCity} results={this.state.results} />
				<ArtistSearchResults artistSearch={this.state.searchArtist} artistResults={this.state.artistResults} />
				<Calendar calendars={this.state.calendars} />
				<ArtistCalendar artistCalendars={this.state.artistCalendars} />
			</div>
		);
	},

	// Update view state when change is received
	_onChange: function(){
		this.setState(getAppState());
	}
});

module.exports = App;