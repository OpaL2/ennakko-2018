'use strict'

const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
require('bootstrap');

const api = require('../js/api');

const LocationsNav = require('./LocationsNav');
const LatestMeasurements = require('./LatestMeasurements');
const TemperatureForm = require('./TemperatureForm');
const Measurements = require('./Measurements');


const rootNode = $('#react-root')[0];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: undefined,
      latest: undefined,
      active: undefined,
      pages: undefined,
    }
    this.setActive = this.setActive.bind(this);
    this.postData = this.postData.bind(this);


    this.getLocations();
  }

  getLocations(){
    this.props.API.getLocations()
    .then((res) => {
      this.setState({locations:res.locations,
        active: res.locations[0].id}, () => {
          this.update();
        });
    })
    .catch(this.apiError);
  }

  setActive(id){
    this.setState({active: id}, () =>{
      this.update();
    });
  }

  postData(temperature){
    this.props.API.post(this.state.active, temperature)
    .then( (res) => {
      this.setState({latest: res.measurements});
    })
    .catch(this.apiError);
  }

  update(){
    this.updateLatest();
    this.updateAll();
  }

  loadNextPage(location, page) {
    if(location == this.state.active) {
      this.props.API.get(location, page + 1)
      .then( (res) => {
        if(res.location_id == this.state.active){
          this.setState( (prev, props) => {
            return {pages: prev.pages.concat(res.measurements)}
          }, () => {
            if(res.measurements.lenght > 0){
              this.loadNextPage(location, page + 1);
            }
          });
        }
      })
      .catch(this.apiError)
    }
  }

  updateAll(){
    this.props.API.get(this.state.active, 0)
    .then( (res) => {
      if(res.location_id == this.state.active){
        this.setState({pages: res.measurements}, () =>{
          this.loadNextPage(res.location_id, 0);
        });
      }
    })
    .catch(this.apiError);
  }

  updateLatest(){
    this.props.API.getLatest()
    .then( (res) => {
      this.setState({latest: res.measurements});
    })
    .catch(this.apiError);
  }



  render() {

    if(this.state.locations && this.state.latest) {
      return(
        <div className="container">
          <div className="row">
            <nav className="col-md-3 col-lg-2">
              <LocationsNav
                locations={this.state.locations}
                active={this.state.active}
                set={this.setActive}
              />
            </nav>
            <main className="col-md-9 col-lg-10">
              <div className="row">
                <div className="col-md">
                  <div className="main-block">
                  <LatestMeasurements
                    data={$.grep(this.state.latest, (e) => {
                      return e.location_id === this.state.active
                    })[0]}
                  />
                </div>
                  <div className="main-block viewport-max">
                  <TemperatureForm
                    post={this.postData}
                    />
                </div>
                </div>
                <div className="col-md main-block">
                  <Measurements 
                    data={this.state.pages}
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