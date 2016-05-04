var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var SearchForm = React.createClass({
	render: function(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" ref="zip" className="form-inline" placeholder="Enter Zip Code" />
					<button type="submit" className="btn btn-xs btn-primary">Submit</button>
				</form>
			</div>
		);
	},

	handleSubmit: function(e){
		e.preventDefault();

		var search = {
			zip: this.refs.zip.value
		};
		AppActions.searchZip(search);
	}
});

module.exports = SearchForm;