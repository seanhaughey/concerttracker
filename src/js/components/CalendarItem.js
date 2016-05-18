var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var CalendarItem = React.createClass({

	render: function(){
		var results = '';
		var artist = '';
		var venue = '';

		if(this.props.calendar.performance[0] === undefined){
			var artist = "Unknown";
		} else{
			var artist = this.props.calendar.performance[0].artist.displayName;
		};
		if(this.props.calendar.venue === undefined){
			var venue = 'Unknown venue';
		} else{
			var venue = this.props.calendar.venue.displayName;
		};
		if(this.props.calendar.location.city === undefined){
			var location = 'Unknown';
		} else{
			var location = this.props.calendar.location.city;
		};
		return(
			<tr>
				<td className="date">{this.props.calendar.start.date}</td><td className="artist">{artist}</td><td className="venue">{venue}</td><td className="location">{location}</td><td className="songkick-link"><a href={this.props.calendar.uri} target="_blank"><img className="sk-link" src="./images/sk-link.jpg"/></a></td><td><a href="#" className="btn btn-xs btn-info" onClick={this.handleSubmit.bind(this, this.props.calendar)}>I'm Interested</a></td>
			</tr>
		);
	},

	handleSubmit: function(){
		var concert = {
			date: this.props.calendar.start.date,
			artist: this.props.calendar.performance[0].artist.displayName,
			venue: this.props.calendar.venue.displayName,
			location: this.props.calendar.location.city,
			link: this.props.calendar.uri
		};
		AppActions.saveConcertToCalendar(concert);
	}
});

module.exports = CalendarItem;
