import React, { Component } from 'react';
import {
  Route,
  Link
} from 'react-router-dom'
import Vessel from './Vessel';

class VesselLocation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      lat: 60,
      lng: 25
    };
  }

  getGeoLocation = () => {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                  position => {
                      console.log(position.coords);
                      this.setState(prevState => ({
                              lat: position.coords.latitude,
                              lng: position.coords.longitude
                      }))
                  }
              )
          } else {
              console.log('error')
          }
      }

  fetchData = () => {
    let lat = this.state.lat;
    let lng = this.state.lng;
    let date = new Date();
    let time = date.toISOString();
    console.log(lat);
    console.log(lng);
    fetch(`http://meri-test.digitraffic.fi/api/v1/locations/latitude/${lat}/longitude/${lng}/radius/20/from/${time}`)
    .then(resp => resp.json())
    .then(data => {
      data = data.features;
      console.log(data);

      this.setState({
        data: data
      });
    })
    .catch(error => console.log(error))
  }

//   componentWillMount() {
//     this.getGeoLocation();
// }

  componentDidMount() {
      this.fetchData();
  }

  render() {

    const listItems = this.state.data.map( item =>
      <li key={item.mmsi}>
        <Link to={`vessel/${item.mmsi}`}>
          {item.mmsi}
        </Link>
      </li>
    )

    return (
      <div>
        <h1>Nearest vessels</h1>
        <ul>{ listItems }</ul>
        <Route path={`/vessel`} component={Vessel} />
      </div>
    );
  }
}

export default VesselLocation;
