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
		vaultConcerts: AppStore.getVaultConcerts()
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
				<Calendar calendars={this.state.calendars} areaId={this.state.areaId} page={this.state.page} resultsPage={this.state.resultsPage} />
				<ArtistCalendar artistCalendars={this.state.artistCalendars} artistId={this.state.artistId} artistPage={this.state.artistPage} artistResultsPage={this.state.artistResultsPage} />
				<ConcertList concerts={this.state.concerts} />
				<VaultConcertList vaultConcerts={this.state.vaultConcerts} />
			</div>
		);
	},

	// Update view state when change is received
	_onChange: function(){
		this.setState(getAppState());
	}
});

module.exports = App;