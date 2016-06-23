var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var Home = React.createClass({
  // ...
	showLock: function() {
    // We receive lock from the parent component in this case
    // If you instantiate it in this component, just do this.lock.show()
		this.props.lock.show();
	},

	render: function() {
		return (
    		<div className="login-box">
      			<a onClick={this.showLock}>Sign In</a>
    		</div>
		);
	}
});

module.exports= Home;