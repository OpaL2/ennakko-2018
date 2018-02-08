const React = require('react');

module.exports = class Measurements extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <React.Fragment>
        <div className="info">
          All measurements:
        </div>
        <ul className="list-group">
          {this.props.data ? this.props.data.map( (i) => 
            <Measurement
              key={i.time}
              data={i}/>
            ) : (<div></div>)}
        </ul>
      </React.Fragment>
    );
  }
}

class Measurement extends React.Component {
  constructor(props){
    super(props);
    this.time = new Date(this.props.data.time);
  }

  formatDateTime(){
    var m = this.time.getMonth() + 1;
    var d = this.time.getDate();
    var y = this.time.getFullYear();
    var h = this.time.getHours();
    var s = this.time.getSeconds();
    var i = this.time.getMinutes();

    return d + '.' + m + '.' + y + ' ' + h + ':' + i + ':' + s;
  }

  render() {
    return(
      <li className="list-group-item">
        {this.formatDateTime()}
        <span className="temperature">{this.props.data.temperature} &deg;C</span>
      </li>
    );
  }
}
