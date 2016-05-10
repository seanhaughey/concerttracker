var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var ArtistCalendarItem = require('./ArtistCalendarItem.js')


var ArtistCalendar = React.createClass({

	render: function(){
		if(this.props.artistCalendars != ''){
			var artistTable = 
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
							this.props.artistCalendars.map(function(artistCalendar, i){
							return (
								<ArtistCalendarItem artistCalendar={artistCalendar} key={i} />
							)
							})
						}
						</tbody>
					</table>
		} else{
			var artistTable = '';
		}
		return(
			<div>				
					{artistTable}
			</div>
		);
	}
});

module.exports = ArtistCalendar;
