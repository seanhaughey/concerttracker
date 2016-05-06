var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var ArtistResult = require('./ArtistResult.js')

var ArtistSearchResults = React.createClass({
	render: function(){
		if (this.props.artistResults != ''){
			var artistResults = <h2 className="page-header">Results: </h2>
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