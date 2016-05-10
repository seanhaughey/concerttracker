var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var Concert = require('./Concert.js')

var ConcertList = React.createClass({
	render: function(){
		return (
			<div>
				<h3>My Calendar</h3>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Date</th>
							<th>Headliner</th>
							<th>Venue</th>
							<th>Location</th>
							<th>Songkick Event Link</th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.concerts.map(function(concert, index){
								return(
									<Concert concert={concert} key={index} />
								)
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports= ConcertList;