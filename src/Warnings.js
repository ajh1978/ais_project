import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Warnings extends Component {

    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
    }

  fetchData = () => {
    const url = `http://meri-test.digitraffic.fi/api/v1/nautical-warnings/published`;
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      data = data.features;
      //console.log(data);
      this.setState({ data: data })
    })
    .catch(error => console.log(error));
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {

    const warningData = this.state.data.map( item =>
      <li key={item.properties.id}>
        <h2>{item.properties.areasEn}</h2>
        <p>{item.properties.id}</p>
        <p>{item.properties.locationEn}</p>
        <p>{item.properties.contentsEn}</p>
        <p>{item.properties.navaidInfo}</p>
      </li>
    )


    return (
      <div>
        <h1>{ this.props.match.params.warning }</h1>
          { warningData }
        </div>
    );
  }
}

export default Warnings;
