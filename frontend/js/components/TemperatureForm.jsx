const React = require('react');

module.exports = class TemperatureForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {temperature: 0};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({temperature: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.post(this.state.temperature);
    this.setState({temperature: 0});
  }

  render() {
    return(
      <form className="TemperatureForm list-group" onSubmit={this.handleSubmit}>
        <label>
          <div className="list-group-item">
            Temperature:
            <span className="Temperature">{this.state.temperature} &deg;C</span>
          </div>
          <div className="SliderContainer list-group-item">
            <input type="range"
              min="-60"
              max="100"
              className="TemperatureSlider container-fluid"
              value={this.state.temperature}
              onChange={this.handleChange} />
          </div>
        </label>
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
      );
  }
}