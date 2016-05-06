var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var CalendarItem = React.createClass({

	render: function(){
		var results = '';
		return(
			<tr>
				<td>{this.props.calendar.displayName} </td><td id="songkick-link"><a href={this.props.calendar.uri}target="_blank"><img id="sk-link" src="./images/sk-link.jpg"/></a></td>
			</tr>
		);
	},

	handleSubmit: function(e){
		e.preventDefault();
	}
});

module.exports = CalendarItem;
