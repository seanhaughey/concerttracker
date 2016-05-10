var Firebase = require('firebase');
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
	},

	searchArtist: function(artistSearch){
		$.ajax({
			url: 'http://api.songkick.com/api/3.0/search/artists.json?query='+artistSearch.artist+'&apikey=fQN7zyRe4VM5w73a&jsoncallback=?',
			dataType: 'jsonp',
			cache: false,
			success: function(data){
				AppActions.receiveArtistResults(data.resultsPage.results);
			}.bind(this),
			error: function(xhr, status, err){
				console.log(err);
			}.bind(this)
		})
	},

	searchId: function(idSearch){
		$.ajax({
			url: 'http://api.songkick.com/api/3.0/metro_areas/'+idSearch.areaId+'/calendar.json?apikey=fQN7zyRe4VM5w73a&jsoncallback=?',
			dataType: 'jsonp',
			cache: false,
			success: function(data){
				if(data.resultsPage.results.event === undefined){
					alert('No results!')
				} else{
					AppActions.receiveCalendars(data.resultsPage.results.event);
				};
			}.bind(this),
			error: function(xhr, status, err){
				console.log(err);
			}.bind(this)
		})
	},

	searchArtistId: function(artistIdSearch){
		$.ajax({
			url: 'http://api.songkick.com/api/3.0/artists/'+artistIdSearch.artistId+'/calendar.json?apikey=fQN7zyRe4VM5w73a&jsoncallback=?',
			dataType: 'jsonp',
			cache: false,
			success: function(data){
				if(data.resultsPage.results.event === undefined){
					alert('This artist is not currently on tour.');
				} else{
					AppActions.receiveArtistCalendars(data.resultsPage.results.event);
				}
			}.bind(this),
			error: function(xhr, status, err){
				console.log(err);
			}.bind(this)
		})
	},

	saveConcertToCalendar: function(concert){
		this.firebaseRef = new Firebase("https://concerttracker.firebaseio.com/calendar");
		this.firebaseRef.push({
			concert: concert
		});
	},

	getConcerts: function(){
		this.firebaseRef = new Firebase('https://concerttracker.firebaseio.com/calendar');
		this.firebaseRef.once("value", function(snapshot){
			var concerts = [];
			snapshot.forEach(function(childSnapshot){
				var concert = {
					id: childSnapshot.key(),
					date: childSnapshot.val().concert.date,
					artist: childSnapshot.val().concert.artist,
					venue: childSnapshot.val().concert.venue,
					location: childSnapshot.val().concert.location,
					link: childSnapshot.val().concert.link,
				}
				concerts.push(concert);
				AppActions.receiveConcerts(concerts);
			});
		});
	},

	removeConcert: function(concertId){
		this.firebaseRef = new Firebase('https://concerttracker.firebaseio.com/calendar/'+concertId);
		this.firebaseRef.remove();
	}

}