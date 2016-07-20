var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var CityResult = require('./CityResult.js')

var CitySearchResults = React.createClass({
	render: function(){
		var action = this.props.cityCalendarCounter;
		if (this.props.results === undefined){
			alert('No results!');
		} 
		return(
			<div>
				{
					this.props.results.map(function(result, i){
					return (
						<CityResult result={result} key={i} cityCalendarCounter={action} />
					)
					})
				}
			</div>
		);
	}
})
module.exports = CitySearchResults;