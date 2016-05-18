var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var Concert = require('./Concert.js')

var ConcertList = React.createClass({
	render: function(){
		return (
			<div>
				<h3>My Upcoming Shows</h3>
				<table className="table table-striped">
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
							this.props.concerts.map(function(concert, index){
								return(
									<Concert concert={concert} key={index} />
								)
							}).sort(function(a, b){
								if(a.props.concert.date > b.props.concert.date){
									return 1;
								}
								if(a.props.concert.date < b.props.concert.date){
									return -1;
								}
								return 0;
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports= ConcertList;