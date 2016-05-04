var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');


var CityResult = React.createClass({

	render: function(){
		return(
			<div className="row">
				<div className="col-md-1">
					<p>{this.props.result.metroArea.displayName}</p>
				</div>
				<div className="col-md-1"></div>
				<button className="btn btn-xs btn-primary">Choose</button>
			</div>
		);
	}

});

module.exports = CityResult;