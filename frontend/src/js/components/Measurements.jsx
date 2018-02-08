const React = require('react');

module.exports = class Measurements extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      showLatest: true
    };
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay(e) {
    this.setState( (prev) => {return {showLatest: !prev.showLatest}});
  }


  render() {
    return(
      <div className="MeasurementsContainer list-group">
      

        {this.state.showLatest ?
        (<MeasurementsLatest data={this.props.data} />) :
        (<MeasurementsPaged 
          getPage={this.props.getPage}
          apiError={this.props.apiError}
          data={this.props.data}
          info={this.props.info}/>)}

        <button id="ToggleMeasurements" 
          type="button" 
          className="btn btn-primary"
          onClick={this.changeDisplay}> 
          {this.state.showLatest ?"Show all" : "Show latest"}
        </button>
      </div>
    );
  }
}


class MeasurementsPaged extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      page: 0,
      data: undefined
    }
  }


  render() {
    return(
      <ul className="Measurements list-group">
        <span className="MeasurementsInfo">
        Data {this.state.page + 1} pages: 
        </span>
        <li className="list-group-item">
        </li>

      </ul>
    );
  }
}

class MeasurementsLatest extends React.Component {

  constructor(props){
    super(props);
  }


  render(){
      return(
      <ul className="Measurements list-group">
        <span className="MeasurementsInfo">Last 24 hours:</span>
        <li className="list-group-item">
          Latest:<span className="Temperature">
            {this.props.data.latest !== null ? this.props.data.latest : "-"} &deg;C
          </span>
        </li>
        <li className="list-group-item">
          Max:<span className="Temperature">
            {this.props.data.highest !== null ? this.props.data.highest : "-"} &deg;C
          </span>
         </li>
         <li className="list-group-item">
          Min:<span className="Temperature">
            {this.props.data.lowest !== null ? this.props.data.lowest : "-"} &deg;C
          </span>
        </li>
      </ul>
    );
  }
}