var AppActions = require('../actions/AppActions');

module.exports = {
	searchCity: function(search){
		$.ajax({
			url: 'http://api.songkick.com/api/3.0/search/locations.json?query='+search.city+'&apikey=fQN7zyRe4VM5w73a&jsoncallback=?',
			dataType: 'jsonp',
			cache: false,
			success: function(data){
				AppActions.receiveResults(data.resultsPage.results);
			}.bind(this),
			error: function(xhr, status, err){
				console.log(err);
			}.bind(this)
		})
	}

}