var React = require('react');

module.exports = class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <span className="timer">
        {this.props.counter < 60 ? 
          this.props.counter + " s" : 
          Math.floor(this.props.counter / 60) + " min"}
      </span>
      );
  }
}