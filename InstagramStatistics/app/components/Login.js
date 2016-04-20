var React = require("react");

module.exports = React.createClass({

  showLock: function() {
    this.props.lock.show();
  },

  render: function() {
    return (
    <div className="login-box">
      <a onClick={this.showLock}>Sign In</a>
    </div>);
  }
})
