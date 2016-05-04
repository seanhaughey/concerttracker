var React = require('react');
var ReactDOM = require('react-dom');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var SearchForm = React.createClass({
	render: function(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" ref="city" className="form-inline" placeholder="Enter City Name" />
					<button type="submit" className="btn btn-xs btn-primary">Submit</button>
				</form>
			</div>
		);
	},

	handleSubmit: function(e){
		e.preventDefault();

		var search = {
			city: this.refs.city.value.trim()
		};
		AppActions.searchCity(search);
		ReactDOM.findDOMNode(this.refs.city).value = "";

	}
});

module.exports = SearchForm;