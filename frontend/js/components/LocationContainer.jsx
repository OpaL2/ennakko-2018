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
    if(this.state.lastUpdate == 360) {
      this.update();
    };
  }

  getLocations(){
    this.props.API.getLocations()
    .then( (locations) => {
      this.setState(locations);
    })
    .catch(this.apiError);
  }

  update(){
    this.props.API.getLatest()
    .then( (measurements) => {
      this.setState(measurements);
      this.setState({lastUpdate: 0});
    })
    .catch(this.apiError);
  }

  apiError(err){
    console.log(err.status);
  }

  post(location_id, temperature) {
    this.props.API.post(location_id, temperature)
    .then( (measurements) => {
      this.setState(measurements);
      this.setState({lastUpdate: 0});
    })
    .catch(this.apiError);
  }

  render() {
    function LocationList(props) {
      return (
        <ul class="Locations">
          {props.locations.map( (location) => 
            <Location key={location.id}
              info={location}
              post={props.post}
              data={props.data}
            />
          )}
        </ul>
      );
    }

    if(this.state.locations && this.state.measurements) {
      return(
        <div className="LocationsContainer">
          <Timer counter={this.state.lastUpdate} />
            <LocationList
              post={(id, temp) => {this.post(id, temp)}}
              locations={this.state.locations}
              data={this.state.measurements}
            />

        </div>
      );
    }

    else {
      return( 
        <div className="LocationsContainer">
          <Timer counter={this.state.lastUpdate} />
          <ul class="Locations">
          </ul>
        </div>
      );
    }
  }
}