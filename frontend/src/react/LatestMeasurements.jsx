const React = require('react');

module.exports = class LatestMeasurements extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <React.Fragment>
      <div className="info">Last 24 hours:</div>
      <ul className="measurements list-group">
        
        <li className="list-group-item">
          Latest:<span className="temperature">
            {this.props.data.latest !== null ? this.props.data.latest : "-"} &deg;C
          </span>
        </li>
        <li className="list-group-item">
          Max:<span className="temperature">
            {this.props.data.highest !== null ? this.props.data.highest : "-"} &deg;C
          </span>
         </li>
         <li className="list-group-item">
          Min:<span className="temperature">
            {this.props.data.lowest !== null ? this.props.data.lowest : "-"} &deg;C
          </span>
        </li>
      </ul>
      </React.Fragment>
    );
  }
}