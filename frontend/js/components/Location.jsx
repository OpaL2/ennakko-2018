var React = require('react');
var $ = require('jquery');

module.exports = class Location extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    function Measurements(props) {
      return(
        <div className="Measurements">
          Latest: <span className="Temperature">
            {props.data.latest ? props.data.latest : "-"} 
          </span>
          Max: <span className="Temperature">
            {props.data.highest ? props.data.highest : "-"}
          </span>
          Min: <span className="Temperature">
            {props.data.lowest ? props.data.lowest : "-"}
          </span>
        </div>
      );
    }
    return(
      <li>
        <div className="Location">
          <h2 className="Name">{this.props.info.name}</h2>
          <Measurements 
            data={$.grep(this.props.data, (e) => {return e.id === this.props.key})[0]}
            />
        </div>
      </li>
    );
  }
}