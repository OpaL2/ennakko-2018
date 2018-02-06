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
        <div className="Measurements container">
          <div className="row">
          Latest:<span className="Temperature">
            {props.data.latest !== null ? props.data.latest : "-"} 
          </span>
          </div>
          <div className="row">
          Max:<span className="Temperature">
            {props.data.highest !== null ? props.data.highest : "-"}
          </span>
          </div>
          <div className="row">
          Min:<span className="Temperature">
            {props.data.lowest !== null ? props.data.lowest : "-"}
          </span>
          </div>
        </div>
      );
    }
    return(
        <li className="Location col-md-4">
          <h2 className="Name">{this.props.info.name}</h2>
          <Measurements 
            data={$.grep(this.props.data, (e) => {
              return e.location_id === this.props.info.id
            })[0]}
            />
          <TemperatureForm 
            post={(temperature) => this.props.post(this.props.info.id, temperature)}/>
        </li>
    );
  }
}