var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var VaultConcert = React.createClass({
	render: function(){
		return (
			<tr>
				<td>{this.props.vaultConcert.date}</td>
				<td>{this.props.vaultConcert.artist}</td>
				<td>{this.props.vaultConcert.venue}</td>
				<td>{this.props.vaultConcert.location}</td>
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