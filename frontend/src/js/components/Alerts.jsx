const React = require('react');

module.exports = class Alerts extends React.Component {

  constructor(props) {
    super(props);
    this.clearAlerts = this.clearAlerts.bind(this);
  }

  clearAlerts() {
    this.props.handler();
  }

  render() {

    if(this.props.alerts.success) {
      return (
      <div id="success" className="alert alert-success alert-dismissible fade show" role="alert">
        Your submission was recieved!
        <button type="button" 
          className="close"
          aria-label="Close"
          onClick={this.clearAlerts}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>);
    }
    else if(this.props.alerts.error) {
      return (
      <div id="error" className="alert alert-error alert-dismissible fade show" role="alert">
        Error occured on server connection!
        <button type="button" 
          className="close"
          data-dismiss="alert" 
          aria-label="Close"
          onClick={this.clearAlerts}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>);
    }
    else {
      return(<div />);
    }
  }
}