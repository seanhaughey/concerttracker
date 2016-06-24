var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var VaultConcert = require('./VaultConcert.js')

var initProfile = {user_id: 1};

var VaultConcertList = React.createClass({

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
				<h3>My Vault</h3>
				<table className="table table-striped">
					<thead>
						<tr>
							<th className="date-header">Date</th>
							<th className="artist-header">Lineup</th>
							<th className="venue-header">Venue</th>
							<th className="location-header">Location</th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.vaultConcerts.map(function(vaultConcert, index){
								console.log(vaultConcert);
								if(userId === vaultConcert.uid){
									return(
										<VaultConcert vaultConcert={vaultConcert} key={index} />
									)
								}
							}).sort(function(a, b){
								if(a.props.vaultConcert.date > b.props.vaultConcert.date){
									return 1;
								}
								if(a.props.vaultConcert.date < b.props.vaultConcert.date){
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

module.exports= VaultConcertList;