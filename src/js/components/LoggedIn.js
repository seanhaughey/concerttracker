var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var LoggedIn = React.createClass({
  getInitialState: function() {
    return {
      profile: null
    }
  },

  componentDidMount: function() {
    // In this case, the lock and token are retrieved from the parent component
    // If these are available locally, use `this.lock` and `this.idToken`
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      this.setState({profile: profile});
    }.bind(this));
  },

  render: function() {
    if (this.state.profile) {
      return (
        <h2>Welcome {this.state.profile.nickname}</h2>
      );
    } else {
      return (
        <div className="loading">Loading profile</div>
      );
    }
  }
});

module.exports= LoggedIn;