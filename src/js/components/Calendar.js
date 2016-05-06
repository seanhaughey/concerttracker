var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var CalendarItem = require('./CalendarItem.js')


var Calendar = React.createClass({

	render: function(){
		return(
			<div>
				<table>
					<thead>
						<tr>
							<th id="date-header">Date</th>
							<th id="artist-header">Artist</th>
							<th id="venue-header">Venue</th>
							<th>Songkick Event Page</th>
						</tr>
					</thead>
					<tbody>
					{
						this.props.calendars.map(function(calendar, i){
						return (
							<CalendarItem calendar={calendar} key={i} />
						)
						})
					}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = Calendar;
