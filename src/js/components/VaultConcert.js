var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var VaultConcert = React.createClass({
	render: function(){
		return (
			<tr>
				<td className="date">{this.props.vaultConcert.date}</td>
				<td className="artist">{this.props.vaultConcert.artist}</td>
				<td className="venue">{this.props.vaultConcert.venue}</td>
				<td className="location">{this.props.vaultConcert.location}</td>
				<td><a href="#" className="btn btn-danger" onClick={this.handleRemove.bind(this, this.props.vaultConcert.id)}>Remove</a></td>
			</tr>
		);
	},

	handleRemove: function(i, j){
		alert ('Are you sure you want to delete?');
		AppActions.removeVaultConcert(i);
	}
});

module.exports= VaultConcert;