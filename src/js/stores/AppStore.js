var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI.js');

var CHANGE_EVENT = 'change';

var _results = [];
var _searchCity = '';
var _calendars = [];

var AppStore = assign({}, EventEmitter.prototype, {
	setSearchCity: function(search){
		_searchCity = search.city;
	},
	getSearchCity: function(){
		return _searchCity;
	},
	setSearchId: function(idSearch){
		_idSearch = idSearch;
	},
	getSearchId: function(){
		return _idSearch;
	},
	setResults: function(results){
		_results = results;
	},
	getResults: function(){
		return _results;
	},
	setCalendars: function(calendars){
		_calendars = calendars;
	},
	getCalendars: function(){
		return _calendars;
	},
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback){
		this.on('change', callback);
	},
	removeChangeListener: function(callback){
		this.removeListener('change', callback);
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

		case AppConstants.SEARCH_ID:
			AppAPI.searchId(action.idSearch);
			AppStore.setSearchId(action.idSearch);
			AppStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.RECEIVE_CALENDARS:
			AppStore.setCalendars(action.calendars);
			AppStore.emit(CHANGE_EVENT);
			break;
	}

	return true;
});

module.exports = AppStore;