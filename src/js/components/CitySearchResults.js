var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var CityResult = require('./CityResult.js')

var CitySearchResults = React.createClass({
	render: function(){
		if (this.props.results === undefined){
			alert('No results!');
		} else if (this.props.results != ''){
			var results = <h5 className="page-header"><strong>Results:</strong></h5>
		} else {
			var results = '';
		}
		return(
			<div>
				{results}
				{
					this.props.results.map(function(result, i){
					return (
						<CityResult result={result} key={i} />
					)
					})
				}
			</div>
		);
	}
})
module.exports = CitySearchResults;