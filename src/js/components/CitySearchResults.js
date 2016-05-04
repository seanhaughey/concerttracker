var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var CityResult = require('./CityResult.js')

var CitySearchResults = React.createClass({
	render: function(){
		// if (this.props.searchText != ''){
		// 	var results = <h2 className="page-header">Results for {this.props.searchText}</h2>
		// } else {
		// 	var results = '';
		// }
		return(
			<div>
				<h2 className="page-header">Results: </h2>
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