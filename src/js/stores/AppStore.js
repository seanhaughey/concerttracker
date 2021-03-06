var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI.js');

var CHANGE_EVENT = 'change';

var _results = [];
var _artistResults = [];
var _searchCity = '';
var _artistSearch = '';
var artistIdSearch = [];
var _calendars = [];
var _resultsPage = [];
var _artistResultsPage = [];
var _areaId = '';
var _artistId = '';
var _page = '';
var _artistPage = '';
var _artistCalendars = [];
var _concerts = [];
var _vaultConcerts = [];
var _artist = '';
var _uid = '';


var AppStore = assign({}, EventEmitter.prototype, {
	setSearchCity: function(search){
		_calendars = [];
		_searchCity = search.city;
	},
	getSearchCity: function(){
		return _searchCity;
	},
	setSearchArtist: function(artistSearch){
		_artistCalendars = [];
		_artistSearch = artistSearch;
	},
	getSearchArtist: function(){
		return _artistSearch;
	},
	setGeoSearch: function(geoSearch){
		_geoSearch = geoSearch;
	},
	getGeoSearch: function(){
		return _geoSearch;
	},
	setSearchId: function(idSearch){
		_idSearch = idSearch;
	},
	getSearchId: function(){
		return _idSearch;
	},
	setArtistSearchId: function(aritstIdSearch){
		_aritstIdSearch = artistIdSearch;
	},
	getArtistSearchId: function(){
		return _aritstIdSearch;
	},
	setResults: function(results){
		_results = results;
		_artistResults = [];
		_artistCalendars = [];
	},
	getResults: function(){
		return _results;
	},
	setUid: function(uid){
		_uid = uid;
	},
	getUid: function(){
		return _uid;
	},
	setArtistResults: function(artistResults){
		_artistResults = artistResults;
		_results = [];
		_calendars = [];
	},
	getArtistResults: function(){
		return _artistResults;
	},
	setArtist: function(artist){
		_artist = artist;
	},
	getArtist: function(){
		return _artist;
	},
	setCalendars: function(calendars){
		_calendars = calendars;
		_results = [];
	},
	getCalendars: function(){
		return (_calendars);
	},
	setResultsPage: function(resultsPage){
		_resultsPage = resultsPage;
	},
	getResultsPage: function(){
		return _resultsPage;
	},
	setArtistResultsPage: function(artistResultsPage){
		_artistResultsPage = artistResultsPage;
	},
	getArtistResultsPage: function(){
		return _artistResultsPage;
	},
	setAreaId: function(areaId){
		_areaId = areaId;
	},
	getAreaId: function(){
		return _areaId;
	},
	setArtistId: function(artistId){
		_artistId = artistId;
	},
	getArtistId: function(){
		return _artistId;
	},
	setPage: function(page){
		_page = page;
	},
	getPage: function(){
		return _page;
	},
	setArtistPage: function(artistPage){
		_artistPage = artistPage
	},
	getArtistPage: function(){
		return _artistPage;
	},
	setArtistCalendars: function(artistCalendars){
		_artistCalendars = artistCalendars;
		_artistResults = [];
	},
	getArtistCalendars: function(){
		return _artistCalendars;
	},
	setConcerts: function(concerts){
		_concerts = concerts;
	},
	getConcerts: function(){
		return _concerts;
	},
	setVaultConcerts: function(vaultConcerts){
		_vaultConcerts = vaultConcerts;
	},
	getVaultConcerts: function(){
		return _vaultConcerts;
	},
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback){
		this.on('change', callback);
	},
	removeChangeListener: function(callback){
		this.removeListener('change', callback);
	},
	saveConcertToCalendar: function(concert){
		_concerts.push(concert);
	},
	removeConcert: function(concertId){
		var index = _concerts.findIndex(function(x){x.id === concertId});
		_concerts.splice(index, 1);
	},
	saveConcertToVault: function(vaultConcert){
		_vaultConcerts.push(vaultConcert);
	},
	removeVaultConcert: function(vaultConcertId){
		var index = _vaultConcerts.findIndex(function(x){x.id === vaultConcertId});
		_vaultConcerts.splice(index, 1);
	}
});

AppDispatcher.register(function(payload){
	var action = payload.action;

	switch(action.actionType){
		case AppConstants.SEARCH_CITY:
			AppAPI.searchCity(action.search);
			AppStore.setSearchCity(action.search);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_RESULTS:
			AppStore.setResults(action.results.location);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_UID:
			AppStore.setUid(action.uid);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_ARTIST_RESULTS:
			AppStore.setArtistResults(action.artistResults.artist);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.SEARCH_ARTIST:
			AppAPI.searchArtist(action.artistSearch);
			AppStore.setSearchArtist(action.artistSearch);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.SEARCH_GEO:
			AppAPI.searchGeo(action.geoSearch);
			AppStore.setSearchCity(action.search);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.SEARCH_ID:
			AppAPI.searchId(action.idSearch);
			AppStore.setSearchId(action.idSearch);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.SEARCH_ARTIST_ID:
			AppAPI.searchArtistId(action.artistIdSearch);
			AppStore.setArtistSearchId(action.artistIdSearch);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_ARTIST:
			AppStore.setArtist(action.artist);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_CALENDARS:
			AppStore.setCalendars(action.calendars);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_RESULTS_PAGE:
			AppStore.setResultsPage(action.resultsPage);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_ARTIST_RESULTS_PAGE:
			AppStore.setArtistResultsPage(action.artistResultsPage);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_AREA_ID:
			AppStore.setAreaId(action.areaId);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_ARTIST_ID:
			AppStore.setArtistId(action.artistId);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_PAGE:
			AppStore.setPage(action.page);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_ARTIST_PAGE:
			AppStore.setArtistPage(action.artistPage);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_ARTIST_CALENDARS:
			AppStore.setArtistCalendars(action.artistCalendars);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.SAVE_CONCERT_TO_CALENDAR:
			AppStore.saveConcertToCalendar(action.concert);
			AppAPI.saveConcertToCalendar(action.concert);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_CONCERTS:
			AppStore.setConcerts(action.concerts);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_VAULT_CONCERTS:
			AppStore.setVaultConcerts(action.vaultConcerts);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.REMOVE_CONCERT:
			AppStore.removeConcert(action.concertId);
			AppAPI.removeConcert(action.concertId);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.SAVE_CONCERT_TO_VAULT:
			AppStore.saveConcertToVault(action.vaultConcert);
			AppAPI.saveConcertToVault(action.vaultConcert);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.REMOVE_VAULT_CONCERT:
			AppStore.removeVaultConcert(action.vaultConcertId);
			AppAPI.removeVaultConcert(action.vaultConcertId);
			AppStore.emit(CHANGE_EVENT);
			break;

	}

	return true;
});

module.exports = AppStore;