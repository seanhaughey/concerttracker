var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var Concert = React.createClass({
	render: function(){
		return (
			<tr>
				<td className="date">{this.props.concert.date}</td>
				<td className="artist">{this.props.concert.artist}</td>
				<td className="venue">{this.props.concert.venue}</td>
				<td className="location">{this.props.concert.location}</td>
				<td className="songkick-link"><a href={this.props.concert.link} target="_blank"><img className="sk-link" src="./images/sk-link.jpg"/></a></td>
				<td className="buttons"><a href="#" className="btn btn-sm btn-default" onClick={this.handleSubmit.bind(this, this.props.concert, this.props.concert.id)}>Saw it!</a> <a href="#" className="btn btn-sm btn-danger" onClick={this.handleRemove.bind(this, this.props.concert.id)}>Delete</a></td>
			</tr>
		);
	},

	handleRemove: function(i, j){
		alert ('Are you sure you want to delete?');
		AppActions.removeConcert(i);
	},

	handleSubmit: function(i, j, k){
		AppActions.saveConcertToVault(i);
		AppActions.removeConcert(j);
	}
});

module.exports= Concert;