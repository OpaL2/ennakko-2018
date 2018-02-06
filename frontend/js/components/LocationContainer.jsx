const React = require('react');

const Location = require('./Location');
const Timer = require('./Timer');
const Alerts = require('./Alerts');


module.exports = class LocationContainer extends React.Component {

  constructor(props){
    super(props);

    this.post = this.post.bind(this);
    this.clearAlerts = this.clearAlerts.bind(this);
    this.state = {
      locations: undefined, 
      measurements: undefined, 
      lastUpdate: 0,
      alerts: {
        success: false,
        error: false
      }
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
    this.setState({alerts:{error: true, success: false}});
  }

  clearAlerts() {
    console.log("Alerts cleared")
    this.setState({alerts: {success: false, error: false}});
  }

  post(location_id, temperature) {
    this.props.API.post(location_id, temperature)
    .then( (measurements) => {
      this.setState(measurements);
      this.setState({lastUpdate: 0, alerts:{success: true, error: false}});
    })
    .catch(this.apiError);
  }

  render() {

    if(this.state.locations && this.state.measurements) {
      return(
        <div className="LocationsContainer container">
          <Alerts alerts={this.state.alerts} handler={this.clearAlerts} />
          <div className="TimerContainer row">
            Last updated: <Timer counter={this.state.lastUpdate} />
          </div>
          <div className="Locations row">
            {this.state.locations.map( (location) => 
              <Location key={location.id}
                info={location}
                post = {this.post}
                data={this.state.measurements}
              />
            )}
          </div>
        </div>
      );
    }

    else {
      return( 
        <div>
        </div>
      );
    }
  }
}