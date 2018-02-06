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
      <form className="TemperatureForm" onSubmit={this.handleSubmit}>
        <label>
          Temperature:
          <input type="number" value={this.state.temperature} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      );
  }
}