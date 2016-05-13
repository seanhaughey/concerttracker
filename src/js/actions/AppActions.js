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
			calendars: calendars,
		});
	},

	receiveResultsPage: function(resultsPage){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_RESULTS_PAGE,
			resultsPage: resultsPage
		});
	},

	receiveArtistResultsPage: function(artistResultsPage){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_ARTIST_RESULTS_PAGE,
			artistResultsPage: artistResultsPage
		});
	},

	receiveAreaId: function(areaId){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_AREA_ID,
			areaId: areaId
		});
	},

	receiveArtistId: function(artistId){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_ARTIST_ID,
			artistId: artistId
		});
	},

	receivePage: function(page){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_PAGE,
			page: page
		});
	},

	receiveArtistPage: function(artistPage){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_ARTIST_PAGE,
			artistPage: artistPage
		})
	},

	receiveArtistCalendars: function(artistCalendars){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_ARTIST_CALENDARS,
			artistCalendars: artistCalendars
		});
	},

	saveConcertToCalendar: function(concert){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SAVE_CONCERT_TO_CALENDAR,
			concert: concert
		});
	},

	receiveConcerts: function(concerts){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_CONCERTS,
			concerts: concerts
		});

	},

	receiveVaultConcerts: function(vaultConcerts){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_VAULT_CONCERTS,
			vaultConcerts: vaultConcerts
		});

	},

	removeConcert: function(concertId){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.REMOVE_CONCERT,
			concertId: concertId
		});
	},

	saveConcertToVault: function(vaultConcert){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SAVE_CONCERT_TO_VAULT,
			vaultConcert: vaultConcert
		})
	},

	removeVaultConcert: function(vaultConcertId){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.REMOVE_VAULT_CONCERT,
			vaultConcertId: vaultConcertId
		})
	}
}

module.exports = AppActions;