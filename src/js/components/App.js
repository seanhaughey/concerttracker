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
		this.setState({idToken: this.getIdToken()})
	},

	componentDidMount: function(){
		AppStore.addChangeListener(this._onChange);
	},

	componentUnmount: function(){
		AppStore.removeChangeListener(this._onChange);
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
			var searchForm = <SearchForm lock={this.lock} idToken={this.state.idToken} />
			var concertList = <ConcertList concerts={this.state.concerts} lock={this.lock} idToken={this.state.idToken}/>
			var vaultConcertList = <VaultConcertList vaultConcerts={this.state.vaultConcerts} lock={this.lock} idToken={this.state.idToken} />
    	} else {
			var searchForm = <SearchForm lock={this.lock} />
			var concertList = '';
			var vaultConcertList = '';
    	}
		return(
			<div>
				{searchForm}
				<CitySearchResults searchText={this.state.searchCity} results={this.state.results} />
				<ArtistSearchResults artistSearch={this.state.searchArtist} artistResults={this.state.artistResults} />
				<Calendar calendars={this.state.calendars} areaId={this.state.areaId} page={this.state.page} resultsPage={this.state.resultsPage} lock={this.lock} idToken={this.state.idToken} />
				<ArtistCalendar artist={this.state.artist} artistCalendars={this.state.artistCalendars} artistId={this.state.artistId} artistPage={this.state.artistPage} artistResultsPage={this.state.artistResultsPage} lock={this.lock} idToken={this.state.idToken} />
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