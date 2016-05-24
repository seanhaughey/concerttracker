var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var ArtistCalendarItem = React.createClass({

	render: function(){
		var results = '';
		var artist = [];
		var venue = '';
		var location= '';
		if(this.props.artistCalendar.performance[0] === undefined){
			var artist = "Unknown";
		} else if(this.props.artistCalendar.performance.length>5) {
			for(i=0; i<5; i++){
				if(i===4) {
					artist.push(this.props.artistCalendar.performance[i].artist.displayName);
				} else {
					artist.push(this.props.artistCalendar.performance[i].artist.displayName + ' | ');
				}
			}
		} else{
			for(i=0; i<this.props.artistCalendar.performance.length; i++){
				if(i===this.props.artistCalendar.performance.length-1) {
					artist.push(this.props.artistCalendar.performance[i].artist.displayName);
				} else {
					artist.push(this.props.artistCalendar.performance[i].artist.displayName + ' | ');
				}
			}
		};
		if(this.props.artistCalendar.venue === undefined){
			var venue = 'Unknown venue';
		} else{
			var venue = this.props.artistCalendar.venue.displayName;
		};
		if(this.props.artistCalendar.location.city === undefined){
			var location = 'Unknown';
		} else{
			var location = this.props.artistCalendar.location.city;
		};
		return(
			<tr>
				<td className="date">{this.props.artistCalendar.start.date} </td><td className="artist"> {artist} </td><td className="venue">{venue} </td><td className="location">{location}</td><td className="songkick-link"><a href={this.props.artistCalendar.uri} target="_blank"><img className="sk-link" src="./images/sk-link.jpg"/></a></td><td><a href="#" className="btn btn-xs btn-info" onClick={this.handleSubmit.bind(this, this.props.artistCalendar)}>I'm Interested</a></td>
			</tr>
		);
	},

	handleSubmit: function(){
		var concert = {
			date: this.props.artistCalendar.start.date,
			artist: this.props.artistCalendar.performance[0].artist.displayName,
			venue: this.props.artistCalendar.venue.displayName,
			location: this.props.artistCalendar.location.city,
			link: this.props.artistCalendar.uri
		};
		AppActions.saveConcertToCalendar(concert);
	}});

module.exports = ArtistCalendarItem;
