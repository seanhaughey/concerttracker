var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var CalendarItem = React.createClass({

	render: function(){
		var results = '';
		return(
			<div>
				{this.props.calendar.displayName} <a href={this.props.calendar.uri} target="_blank">Songkick Event Page</a>
			</div>
		);
	},

	handleSubmit: function(e){
		e.preventDefault();
	}
});

module.exports = CalendarItem;
