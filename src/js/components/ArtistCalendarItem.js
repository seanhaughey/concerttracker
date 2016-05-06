var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var ArtistCalendarItem = React.createClass({

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
		}
		return(
			<tr>
				<td id="date">{this.props.calendar.start.date} </td><td id="artist"> {artist} </td><td id="venue">{venue} </td><td id="songkick-link"><a href={this.props.calendar.uri}target="_blank"><img id="sk-link" src="./images/sk-link.jpg"/></a></td><td><a href="#" className="btn btn-xs btn-info">I'm Interested</a></td>
			</tr>
		);
	},

	handleSubmit: function(e){
		e.preventDefault();
	}
});

module.exports = ArtistCalendarItem;
