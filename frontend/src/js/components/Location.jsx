const React = require('react');
const $ = require('jquery');

const TemperatureForm = require('./TemperatureForm');
const Measurements = require('./Measurements');

module.exports = class Location extends React.Component {

  constructor(props){
    super(props);
  }

  render() {

    return(
        <div className="Location col-md-6 col-lg-4 card">
          <div className="card-body">
            <h2 className="Name">{this.props.info.name}</h2>
          </div>
          <div className="card-body">
          <Measurements 
            data={$.grep(this.props.data, (e) => {
              return e.location_id === this.props.info.id
            })[0]}
            getPage = {this.props.getPage}
            apiError = {this.props.apiError}
            info = {this.props.info}
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