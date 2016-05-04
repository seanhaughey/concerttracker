var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');


var CityResult = React.createClass({

	render: function(){
		return(
			<div>
				<p>{this.props.result.metroArea.displayName}</p>
			</div>
		);
	}

});

module.exports = CityResult;