var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');


var AppActions = {
	searchCity: function(search){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SEARCH_CITY,
			search: search
		});
	},

	receiveResults: function(results){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_RESULTS,
			results: results
		});
	},

	searchArtist: function(artistSearch){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SEARCH_ARTIST,
			artistSearch: artistSearch
		});
	},

	receiveArtistResults: function(artistResults){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_ARTIST_RESULTS,
			artistResults: artistResults
		});
	},

	searchId: function(idSearch){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SEARCH_ID,
			idSearch: idSearch
		});
	},

	searchArtistId: function(artistIdSearch){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SEARCH_ARTIST_ID,
			artistIdSearch: artistIdSearch
		});
	},

	receiveCalendars: function(calendars){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_CALENDARS,
			calendars: calendars
		})
	}
}

module.exports = AppActions;