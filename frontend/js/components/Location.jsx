var React = require('react');
var $ = require('jquery');

const TemperatureForm = require('./TemperatureForm');

module.exports = class Location extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    function Measurements(props) {
      return(
        <ul className="Measurements list-group">
          <span class="MeasurementsInfo">Last 24 hours:</span>
          <li className="list-group-item">
          Latest:<span className="Temperature">
            {props.data.latest !== null ? props.data.latest : "-"} &deg;C
          </span>
          </li>
          <li className="list-group-item">
          Max:<span className="Temperature">
            {props.data.highest !== null ? props.data.highest : "-"} &deg;C
          </span>
          </li>
          <li className="list-group-item">
          Min:<span className="Temperature">
            {props.data.lowest !== null ? props.data.lowest : "-"} &deg;C
          </span>
          </li>
        </ul>
      );
    }
    return(
        <div className="Location col-md-4 card">
          <div className="card-body">
            <h2 className="Name">{this.props.info.name}</h2>
          </div>
          <div className="card-body">
          <Measurements 
            data={$.grep(this.props.data, (e) => {
              return e.location_id === this.props.info.id
            })[0]}
            />
          </div>
          <div className="card-body">
          <TemperatureForm 
            post={(temperature) => this.props.post(this.props.info.id, temperature)}/>
          </div>
        </div>
    );
  }
}