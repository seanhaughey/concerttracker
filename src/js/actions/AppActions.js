var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');


var AppActions = {
	searchZip: function(search){
		console.log(search);
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SEARCH_ZIP,
			search: search
		});
	}
}

module.exports = AppActions;