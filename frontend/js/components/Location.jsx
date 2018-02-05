var React = require('react');

module.exports = class Location extends React.Component {

  constructor(props){
    super(props);
    this.state = undefined;
    
    this.submit = this.sublit.bind(this);
  }

  submit() {

  }

  update(datapoints) {
    this.setState(datapoints);
  }

  render() {
    return(
      <div class="location">
        <h2> {this.props.location.name} </h2> 
        <span class="latest">{this.state.latest ? this.state.latest : '-'}</span>
        <span class="highest">{this.state.highest ? this.state.highest : '-'}</span>
        <span class="lowest">{this.state.lowest ? this.state.lowest : '-'}</span>

        <button onClick={submit}>Submit</button>
      </div>
    );
  }
}