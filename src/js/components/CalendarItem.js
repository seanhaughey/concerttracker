var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var CalendarItem = React.createClass({

	render: function(){
		var results = '';
		return(
			<tr>
				<td id="date">{this.props.calendar.start.date} </td><td id="artist"> {this.props.calendar.performance[0].artist.displayName} </td><td id="venue">{this.props.calendar.venue.displayName} </td><td id="songkick-link"><a href={this.props.calendar.uri}target="_blank"><img id="sk-link" src="./images/sk-link.jpg"/></a></td>
			</tr>
		);
	},

	handleSubmit: function(e){
		e.preventDefault();
	}
});

module.exports = CalendarItem;
