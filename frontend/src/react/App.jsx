'use strict'

const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
require('bootstrap');

const api = require('../js/api');

const LocationsNav = require('./LocationsNav');


const rootNode = $('#react-root')[0];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: undefined
    }
    this.props.API.getLocations()
    .then( (res) => {this.setState(res)});
  }

  render() {

    if(this.state.locations) {
      return(
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <LocationsNav
                locations={this.state.locations}
                active={1}
              />
            </div>
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