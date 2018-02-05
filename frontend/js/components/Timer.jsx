var React = require('react');

module.exports = class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {lastUpdate: 0};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState( (prev, props) => {
      lastUpdate: prev.lastUpdate + 1
    });
  }


  render() {
    return(
      <span class="timer">
        {this.state.lastUpdate < 60 ? 
          this.state.lastUpdate + " s" : 
          Math.floor(this.state.lastUpdate / 60) + " min"}
      </span>
      );
  }
}