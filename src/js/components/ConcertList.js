var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var Concert = require('./Concert.js')

var initProfile = {user_id: 1};

var ConcertList = React.createClass({

	showLock: function() {
    // We receive lock from the parent component in this case
    // If you instantiate it in this component, just do this.lock.show()
		this.props.lock.show();
	},

	getInitialState: function(){
		return {profile: initProfile};
	},

	componentWillMount: function() {
    // In this case, the lock and token are retrieved from the parent component
    // If these are available locally, use `this.lock` and `this.idToken`
    	this.props.lock.getProfile(this.props.idToken, function (err, profile) {
			if (err) {
        	console.log("Error loading the Profile", err);
        	return;
		}
		this.setState({profile: profile});
		}.bind(this));
	},

	render: function(){
		var userId = this.state.profile.user_id;
		return (
			<div>
				<h3>My Upcoming Shows</h3>
				<table className="table table-striped">
					<thead>
						<tr>
							<th className="date-header">Date</th>
							<th className="artist-header">Lineup</th>
							<th className="venue-header">Venue</th>
							<th className="location-header">Location</th>
							<th className="sk-link-header">Songkick Event Page</th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.concerts.map(function(concert, index){
								if(userId === concert.uid){
									return(
										<Concert concert={concert} key={index} />
									)
								}
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