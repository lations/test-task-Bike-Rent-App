import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.css';
import { bindActionCreators } from 'redux';
import { getBikesData } from '../action-creators/FetchBikesData';
import { fetchData } from '../action-creators/FetchBikesData';

class AvailableBikes extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        const url = 'http://localhost:8000/bikes';
        const action = 'GET_BIKE_LIST'
        this.props.getBikesData(url,action)
    }

    handleSubmit (event) {
        event.preventDefault();
        const url = 'http://localhost:8000/bikes';
        const action = 'GET_BIKE_LIST';
        let method;
        let data;

        if (event.target.name === 'Rent') {
            method = 'PUT';
            data = {
                action:'RENT',
                id: event.target.parentElement.getAttribute("value")
            }
        }
        else if (event.target.name === 'Delete') {
            method = 'DELETE';
            data = {
                id: event.target.parentElement.getAttribute("value")
            }
        }
        fetchData(url,data,method);
        this.props.getBikesData(url,action)
    }

    render() {
        return (
            <div className = 'available-bikes'>
                <h4>
                    <span role="img" aria-label = 'money-mouth face'>
                        {String.fromCodePoint(0x1F6B2)}
                    </span>
                    {` Available bicycles (${this.props.available_bikes.length})`}
                </h4>
                <div className="available-bikes-container" >
                    {this.props.available_bikes.map((bike,index) =>
                            <div className="available-bike" key={index}>
                                    <p>{`${bike.name} / ${bike.type} / $${bike.price}`}</p>
                                <div value = {bike._id}>
                                    <button type="submit" name = "Rent" className="btn btn-primary" onClick={this.handleSubmit} >Rent</button>
                                    <button type="submit" name = "Delete" className="btn btn-danger" onClick={this.handleSubmit} >Delete</button>
                                </div>
                            </div>
                    )}
                </div>
            </div>    
        );
    }
}

function mapStateToProps(state) {
    return {
        available_bikes: state.mainReducer.available_bikes
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ getBikesData }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AvailableBikes);