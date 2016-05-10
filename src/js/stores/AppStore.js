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
var _artistCalendars = [];
var _concerts = [];


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
	setArtistResults: function(artistResults){
		_artistResults = artistResults;
		_results = [];
		_calendars = [];
	},
	getArtistResults: function(){
		return _artistResults;
	},
	setCalendars: function(calendars){
		_calendars = calendars;
		_results = [];
	},
	getCalendars: function(){
		return _calendars;
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
		var index = _concerts.findIndex(x => x.id === concertId);
		_concerts.splice(index, 1);
	},
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

		case AppConstants.RECEIVE_ARTIST_RESULTS:
			AppStore.setArtistResults(action.artistResults.artist);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.SEARCH_ARTIST:
			AppAPI.searchArtist(action.artistSearch);
			AppStore.setSearchArtist(action.artistSearch);
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

		case AppConstants.RECEIVE_CALENDARS:
			AppStore.setCalendars(action.calendars);
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

		case AppConstants.REMOVE_CONCERT:
			AppStore.removeConcert(action.concertId);
			AppAPI.removeConcert(action.concertId);
			AppStore.emit(CHANGE_EVENT);
			break;
	}

	return true;
});

module.exports = AppStore;