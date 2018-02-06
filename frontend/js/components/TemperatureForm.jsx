var React = require('react');

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
      <form className="TemperatureForm container" onSubmit={this.handleSubmit}>
        <label>
          <div className="row">
            Temperature: 
            <span className="Temperature">{this.state.temperature}</span>
          </div>
          <div className="SliderContainer row">
            <input type="range"
              min="-60"
              max="100"
              className="TemperatureSlider"
              value={this.state.temperature}
              onChange={this.handleChange} />
          </div>
        </label>
        <input type="submit" value="Submit" className="row" />
      </form>
      );
  }
}