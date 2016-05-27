var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var VaultConcert = require('./VaultConcert.js')

var VaultConcertList = React.createClass({
	render: function(){
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
								return(
									<VaultConcert vaultConcert={vaultConcert} key={index} />
								)
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