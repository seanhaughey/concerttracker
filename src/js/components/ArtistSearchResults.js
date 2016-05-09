var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var ArtistResult = require('./ArtistResult.js')

var ArtistSearchResults = React.createClass({
	render: function(){
		if (this.props.artistResults === undefined){
			alert('No results!');
		} else if (this.props.artistResults != ''){
			var artistResults = 
				<div className="row">
					<div className="col-md-2">
						<h5 className="page-header"><strong>Artist</strong></h5>
					</div>
					<div className="col-md-2">
						<h5 className="page-header"><strong>Songkick Artist Page</strong></h5>
					</div>
				</div>
		} else {
			var artistResults = '';
		};
		return(
			<div>
				{artistResults}
				{
					this.props.artistResults.map(function(artistResult, i){
					return (
						<ArtistResult artistResult={artistResult} key={i} />
					)
					})
				}
			</div>
		);
	}
})
module.exports = ArtistSearchResults;