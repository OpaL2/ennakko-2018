const React = require('react');

module.exports = class LocationsNav extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
    <div className="list-group">
      {this.props.locations.map( (location) => 
        <LocationNavElement 
          key={location.id}
          info={location}
          active={this.props.active === location.id}
          set = {this.props.set}
        />
      )}
    </div>
    );
  }
}


class LocationNavElement extends React.Component {

  constructor(props){
    super(props);
    this.navClick = this.navClick.bind(this);
  }

  navClick(e) {
    e.preventDefault();
    this.props.set(this.props.info.id);
  }

  render(){
    return(
        <button
          type="button"
          className={this.props.active ? 
            "active list-group-item" : 
            "list-group-item"}
          onClick={this.navClick}
          id="locationNavButton"
        > 
        {this.props.info.name}
        </button>
    );
  }
}