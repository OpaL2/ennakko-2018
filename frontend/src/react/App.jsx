'use strict'

const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
require('bootstrap');

const api = require('../js/api');

const LocationsNav = require('./LocationsNav');
const LatestMeasurements = require('./LatestMeasurements');
const TemperatureForm = require('./TemperatureForm');


const rootNode = $('#react-root')[0];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: undefined,
      latest: undefined,
      active: 1,
      page: undefined
    }
    this.nextMeasurementPage = this.nextMeasurementPage.bind(this);
    this.previousMeasurementPage = this.previousMeasurementPage.bind(this);
    this.setActive = this.setActive.bind(this);

    this.props.API.getLocations()
    .then( (res) => {this.setState(res)});
    
    this.props.API.getLatest()
    .then( (res) => {this.setState({latest: res.measurements})});

    this.props
  }

  nextMeasurementPage(){

  }

  previousMeasurementPage(){

  }

  setActive(id){

  }

  render() {

    if(this.state.locations && this.state.latest) {
      return(
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-3">
              <LocationsNav
                locations={this.state.locations}
                active={this.state.active}
                set={this.setActive}
              />
            </nav>
            <main className="col-md-9 container-fluid">
              <div className="row">
                <div className="col-md-6 main-block">
                  <LatestMeasurements
                    data={$.grep(this.state.latest, (e) => {
                      return e.location_id === this.state.active
                    })[0]}
                  />
                </div>
                <div className="col-md-6 main-block">
                  <Measurements 
                    data={this.state.page}
                    next={this.nextMeasurementPage}
                    previous={this.previousMeasurementPage}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 main-block">
                  <TemperatureForm
                    post=""
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      );
    }
    return(
      <div></div>
    );
  }

}




$(document).ready(() => {
  ReactDOM.render((<App API={api}/>), rootNode);
});