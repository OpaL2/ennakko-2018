var React = require('react');
var ReactDOM = require('react-dom');
const Location = require('./Location');
const Timer = require('./Timer');


module.exports = class LocationContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      locations: [], 
      measurements: [], 
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
        <ul className="Locations" >
          {props.locations.map( (location) => 
            <Location key={location.id}
              info={location}
              post={props.post}
              data={props.measurements}
            />
          )}
        </ul>
      );
    }

    return(
      <div className="LocationsContainer">
        <Timer counter={this.state.lastUpdate} />
        <div className="LocationWrapper">
          <LocationList
            post={this.post}
            locations={this.state.locations}
            data={this.state.measurements}
          />
        </div>
      </div>
    );
  }
}