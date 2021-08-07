import React from 'react';
import { Component } from 'react';
import RentForm from '../containers/formController';
import RentedBikes  from '../containers/rentedBikesComponent';
import AvailableBikes  from '../containers/availableBikesComponent';

export default class App extends Component {
  render() {
    return (
        <div className = 'App'>
            <h2><b>Awesome Bike Rental</b></h2>
            <RentForm/>
            <RentedBikes/>
            <AvailableBikes/>
        </div>
    );
  }
}
