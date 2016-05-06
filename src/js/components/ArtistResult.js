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
					<div className="col-md-1"></div>
					<button className="btn btn-xs btn-primary">Choose</button>
				</form>
			</div>
		);
	},

	handleSubmit: function(e){
		e.preventDefault();
		var artistIdSearch = {
			artistId: this.refs.artistId.value
		};
		AppActions.searchArtistId(artistIdSearch);
		console.log(artistIdSearch);
	}
});

module.exports = ArtistResult;
