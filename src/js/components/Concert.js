var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var Concert = React.createClass({
	render: function(){
		return (
			<tr>
				<td>{this.props.concert.date}</td>
				<td>{this.props.concert.artist}</td>
				<td>{this.props.concert.venue}</td>
				<td>{this.props.concert.location}</td>
				<td><a href={this.props.concert.link} target="_blank"><img className="sk-link" src="./images/sk-link.jpg"/></a></td>
				<td><a href="#" className="btn btn-default" onClick={this.handleEdit.bind(this, this.props.concert)}>Attended</a> <a href="#" className="btn btn-danger" onClick={this.handleRemove.bind(this, this.props.concert.id)}>Remove</a></td>
			</tr>
		);
	},

	handleRemove: function(i, j){
		alert ('Are you sure you want to delete?');
		AppActions.removeConcert(i);
	},

	handleEdit: function(i, j){
		// AppActions.editContact(i);
	}
});

module.exports= Concert;