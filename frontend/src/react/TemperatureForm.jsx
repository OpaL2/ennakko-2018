const React = require('react');

module.exports = class TemperatureForm extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      value: 0
    };
    this.min=-60;
    this.max=100;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render(){
    return(
      <form className="temperature-form"
        onSubmit={this.handleSubmit}>
        <label className="info">
            Post new temperature:
        </label>
          <div className="ist-group">
          <div className="numeric-container list-group-item">
            <input type="number"
              min={this.min}
              max={this.max}
              className="temperature-numeric"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className="slider-container list-group-item">
            <input type="range"
              min={this.min}
              max={this.max}
              className="temperature-slider"
              value={this.state.value}
              onChange={this.handleChange} />
            </div>
          </div>
        <div className="submit-container">
        <input type="submit"
          value="Submit"
          className=" temperature-submit btn btn-primary container-fluid" />
        </div>
      </form>
    );
  }
}