import React, { Component } from 'react';

class Vessel extends Component {

    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
    }

  fetchData = () => {
    const url = `http://meri-test.digitraffic.fi/api/v1/metadata/vessels/${ this.props.match.params.vessel }`;
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      this.setState({ data: data })
    })
    .catch(error => console.log(error));
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const vesselData =
    <div key={this.state.data.mmsi}>
      <h2>{this.state.data.name}</h2>
      <ul>
        <li>mmsi: {this.state.data.mmsi}</li>
        <li>Destination: {this.state.data.destination}</li>
      </ul>
    </div>

    return (
      <div>
        <h1>{ this.props.match.params.vessel }</h1>
          { vesselData }
      </div>
    );
  }
}

export default Vessel;
