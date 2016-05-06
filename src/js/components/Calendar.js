var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var CalendarItem = require('./CalendarItem.js')


var Calendar = React.createClass({

	render: function(){
		return(
			<div>
				{
					this.props.calendars.map(function(calendar, i){
					return (
						<CalendarItem calendar={calendar} key={i} />
					)
					})
				}
			</div>
		);
	}
});

module.exports = Calendar;
