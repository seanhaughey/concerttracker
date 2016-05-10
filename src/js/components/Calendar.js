var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var CalendarItem = require('./CalendarItem.js')


var Calendar = React.createClass({

	render: function(){
		if(this.props.calendars != ''){
			var table = 
				<table className="table-striped">
					<thead>
						<tr>
							<th className="date-header">Date</th>
							<th className="artist-header">Headliner</th>
							<th className="venue-header">Venue</th>
							<th className="location-header">Location</th>
							<th className="sk-link-header">Songkick Event Page</th>
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
		} else{
			var table = '';
		}
		return(
			<div>				
					{table}
			</div>
		);
	}
});

module.exports = Calendar;
