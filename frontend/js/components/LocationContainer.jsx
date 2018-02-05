var React = require('react');
var ReactDOM = require('react-dom');
const Location = require('./Location');
const Timer = require('./Timer');


module.exports = class LocationContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      locations: undefined, 
      measurements: undefined, 
      lastUpdate: 0
    };
    this.getLocations();
    this.update();
  }

  componentDidMount() {
    this.timerID = setInterval( () => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState( (prev, props) => {
      return {lastUpdate: prev.lastUpdate + 1}
    });
    if(this.lastUpdate == 360) {
      this.update();
    };
  }

  getLocations(){
    this.props.API.getLocations()
    .then( (locations) => {
      this.setState({locations: locations});
    })
    .catch(this.apiError);
  }

  update(){
    this.props.API.getLatest()
    .then( (measurements) => {
      this.setState({measurements: measurements, lastUpdate: 0});
    })
    .catch(this.apiError);
  }

  apiError(err){
    console.log(err.status);
  }

  post(location_id, temperature) {

  }

  render() {
    if(this.state.locations === undefined) {
      return(
        <div className="location-container" >
          <Timer counter={this.state.lastUpdate} />
        </div>
      );
    }
    else {
      const container = this.locations.map( (location) => {
        var parentProps = {
          info: location,
          submit: this.post,
          measurements: this.state.measurements
        };
        return(<Location parent={parentProps} />);
      });

      return(
        <div className="location-container" >
          <Timer counter={this.state.lastUpdate} />
          {container}
        </div>
      );
    }
  }
}