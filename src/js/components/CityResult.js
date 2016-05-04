var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');


var CityResult = React.createClass({

	getInitialState: function() {
		return {
			value: this.props.result.metroArea.id
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
					<div className="col-md-1">
						<p>{this.props.result.metroArea.displayName}</p>
						<input className="hidden" type="text" ref="areaId" value={this.props.result.metroArea.id} onChange={this.handleChange}/>
					</div>
					<div className="col-md-1"></div>
					<button className="btn btn-xs btn-primary">Choose</button>
				</form>
			</div>
		);
	},

	handleSubmit: function(e){
		e.preventDefault();
		var search = {
			areaId: this.refs.areaId.value
		};
		AppActions.searchId(search);
	}
});

module.exports = CityResult;