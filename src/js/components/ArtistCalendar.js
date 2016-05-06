var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var ArtistCalendarItem = require('./ArtistCalendarItem.js')


var ArtistCalendar = React.createClass({

	render: function(){
		if(this.props.calendars != ''){
			var table = 
				<table>
					<thead>
						<tr>
							<th id="date-header">Date</th>
							<th id="artist-header">Artist</th>
							<th id="venue-header">Venue</th>
							<th id="sk-link-header">Songkick Event Page</th>
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

module.exports = ArtistCalendar;
