var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var SearchForm = require('./SearchForm.js');
var CitySearchResults = require('./CitySearchResults.js');
var ArtistSearchResults = require('./ArtistSearchResults.js');
var Calendar = require('./Calendar.js');
var ArtistCalendar = require('./ArtistCalendar.js');
var ConcertList = require('./ConcertList.js');
var VaultConcertList = require('./VaultConcertList.js');

function getAppState(){
	return {
		results: AppStore.getResults(),
		calendars: AppStore.getCalendars(),
		resultsPage: AppStore.getResultsPage(),
		artistResultsPage: AppStore.getArtistResultsPage(),
		areaId: AppStore.getAreaId(),
		artistId: AppStore.getArtistId(),
		page: AppStore.getPage(),
		artistPage: AppStore.getArtistPage(),
		artistResults: AppStore.getArtistResults(),
		artistCalendars: AppStore.getArtistCalendars(),
		concerts: AppStore.getConcerts(),
		vaultConcerts: AppStore.getVaultConcerts(),
		artist: AppStore.getArtist(),
		uid: AppStore.getUid()
	}
};

var App = React.createClass({

	getInitialState: function(){
		return getAppState();
	},

	componentWillMount: function() {
		this.lock = new Auth0Lock('DygnI5tYY4dDWknL8nlO9u0cs0UJQqXP', 'haughey-react-auth.auth0.com');
		this.setState({
			idToken: this.getIdToken(),
			calendarCounter: 1,
			vaultCounter: 0,
			cityCalenderCounter: 0,
			artistCalendarCounter: 0
		})
	},

	componentDidMount: function(){
		AppStore.addChangeListener(this._onChange);
	},

	componentUnmount: function(){
		AppStore.removeChangeListener(this._onChange);
	},

	handleZeroCounter: function() {
		this.setState({
			calendarCounter: 0,
			vaultCounter: 0,
			cityCalenderCounter: 0,
			artistCalendarCounter: 0,
			artistSearchCounter: 0,
			citySearchCounter: 0
		});
	},

	handleCalendarCounter: function(){
		this.setState({
			calendarCounter: 1,
			vaultCounter: 0,
			cityCalendarCounter: 0,
			artistCalendarCounter: 0,
			artistSearchCounter: 0,
			citySearchCounter: 0
		});
	},

	handleVaultCounter: function(){
		this.setState({
			vaultCounter: 1,
			calendarCounter: 0,
			cityCalendarCounter: 0,
			artistCalendarCounter: 0,
			artistSearchCounter: 0,
			citySearchCounter: 0
		});
	},

	handleCityCalendarCounter: function(){
		this.setState({
			vaultCounter: 0,
			calendarCounter: 0,
			cityCalendarCounter: 1,
			artistCalendarCounter: 0,
			artistSearchCounter: 0,
			citySearchCounter: 0
		})
	},

	handleArtistCalendarCounter: function(){
		this.setState({
			vaultCounter: 0,
			calendarCounter: 0,
			cityCalendarCounter: 0,
			artistCalendarCounter: 1,
			artistSearchCounter: 0,
			citySearchCounter: 0
		})
	},

	handleCitySearchCounter: function(){
		this.setState({
			vaultCounter: 0,
			calendarCounter: 0,
			cityCalendarCounter: 0,
			artistCalendarCounter: 0,
			artistSearchCounter: 0,
			citySearchCounter: 1
		})
	},

	handleArtistSearchCounter: function(){
		this.setState({
			vaultCounter: 0,
			calendarCounter: 0,
			cityCalendarCounter: 0,
			artistCalendarCounter: 0,
			artistSearchCounter: 1,
			citySearchCounter: 0
		})
	},

	getIdToken: function() {
    	var idToken = localStorage.getItem('userToken');
    	var authHash = this.lock.parseHash(window.location.hash);
    	if (!idToken && authHash) {
      		if (authHash.id_token) {
        		idToken = authHash.id_token
        		localStorage.setItem('userToken', authHash.id_token);
      		}
      		if (authHash.error) {
        		console.log("Error signing in", authHash);
        		return null;
      		}
    	}
    	return idToken;
	},

	render: function(){
		if (this.state.idToken) {
			var searchForm = <SearchForm lock={this.lock} idToken={this.state.idToken} onClick={this.handleZeroCounter} calendarCounter={this.handleCalendarCounter} vaultCounter={this.handleVaultCounter} citySearchCounter={this.handleCitySearchCounter} artistSearchCounter={this.handleArtistSearchCounter} />
    	} else {
			var searchForm = <SearchForm lock={this.lock} />
    	}
    	if(this.state.calendarCounter === 0){
    		var concertList = '';
    	} else{
    		var concertList = <ConcertList concerts={this.state.concerts} lock={this.lock} idToken={this.state.idToken}/>
    	}
    	if(this.state.vaultCounter === 0){
    		var vaultConcertList = '';
    	} else {
    		var vaultConcertList = <VaultConcertList vaultConcerts={this.state.vaultConcerts} lock={this.lock} idToken={this.state.idToken} />
    	}
    	if(this.state.cityCalendarCounter === 0){
    		var cityCalendar = '';
    	} else {
    		var cityCalendar = <Calendar calendars={this.state.calendars} areaId={this.state.areaId} page={this.state.page} resultsPage={this.state.resultsPage} lock={this.lock} idToken={this.state.idToken} onClick={this.handleZeroCounter} />
    	}
    	if(this.state.artistCalendarCounter === 0){
    		var artistCalendar = '';
    	} else {
    		var artistCalendar = <ArtistCalendar artist={this.state.artist} artistCalendars={this.state.artistCalendars} artistId={this.state.artistId} artistPage={this.state.artistPage} artistResultsPage={this.state.artistResultsPage} lock={this.lock} idToken={this.state.idToken} onClick={this.handleZeroCounter} />
    	}
    	if(this.state.artistSearchCounter === 0){
    		var artistSearchResults = '';
    	} else {
    		var artistSearchResults = <ArtistSearchResults artistSearch={this.state.searchArtist} artistResults={this.state.artistResults} artistCalendarCounter={this.handleArtistCalendarCounter} />
    	}
    	if(this.state.citySearchCounter === 0){
    		var citySearchResults = '';
    	} else {
    		var citySearchResults = <CitySearchResults searchText={this.state.searchCity} results={this.state.results} cityCalendarCounter={this.handleCityCalendarCounter} />
    	}
		return(
			<div>
				{searchForm}
				{citySearchResults}
				{artistSearchResults}
				{cityCalendar}
				{artistCalendar}
				{concertList}
				{vaultConcertList}
				
			</div>
		);
	},

	// Update view state when change is received
	_onChange: function(){
		this.setState(getAppState());
	}
});

module.exports = App;