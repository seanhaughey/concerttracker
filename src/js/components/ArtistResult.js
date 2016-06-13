var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');


var ArtistResult = React.createClass({

	getInitialState: function() {
		return {
			value: this.props.artistResult.id
		};
	},

	handleChange: function(event) {
		this.setState({
			value: event.target.value
		});
	},

	render: function(){
		return(
			<div className="row">
				<form onSubmit={this.handleSubmit}>
					<div className="col-md-2">
						<p>{this.props.artistResult.displayName}</p>
						<input className="hidden" type="text" ref="artistId" value={this.props.artistResult.id} onChange={this.handleChange}/>
					</div>
					<div className="col-md-2">
						<a href={this.props.artistResult.uri} target="_blank"><img id="sk-artist-link" src="./images/sk-link.jpg"/></a>
					</div>
					<div className="col-md-1"></div>
					<button className="btn btn-xs btn-primary">Choose</button>
				</form>
			</div>
		);
	},

	handleSubmit: function(e){
		e.preventDefault();
		console.log(this.props.artistResult.displayName);
		var artistIdSearch = {
			artist: this.props.artistResult.displayName,
			artistId: this.refs.artistId.value,
			page: 1
		};
		AppActions.searchArtistId(artistIdSearch);
	}
});

module.exports = ArtistResult;
