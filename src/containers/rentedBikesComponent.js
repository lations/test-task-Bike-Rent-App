import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.css';
import { bindActionCreators } from 'redux';
import { getBikesData } from '../action-creators/FetchBikesData';
import { fetchData } from '../action-creators/FetchBikesData';

class RentedBikes extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        const url = 'http://localhost:8000/bikes';
        const action = 'GET_BIKE_LIST'
        if (!this.props.rented_bikes) {
            this.props.getBikesData(url,action)
        }
    }

    handleSubmit (event) {
        event.preventDefault();
        const url = 'http://localhost:8000/bikes';
        const method = 'PUT';
        const action = 'GET_BIKE_LIST'
        const data = {
            action:'UNRENT',
            id: event.target.parentElement.getAttribute("value")
        }

        fetchData(url,data,method);
        this.props.getBikesData(url,action)
    }

    render() {
        return (
            <div className = 'rented-bikes'>
                <h4>
                    <span role="img" aria-label = 'money-mouth face'>
                        {String.fromCodePoint(0x1F4B0)}
                    </span>
                    {` Your Rent (Total:$
                        ${this.props.rented_bikes.reduce(
                            (result,bike) => result + bike.price, 0
                        )})`
                    }
                </h4>
                <div className="rented-bikes-container">
                    {this.props.rented_bikes.map((bike,index) =>
                            <div className="rented-bike" key={index}>
                                <p>{`${bike.name} / ${bike.type} / $${bike.price}`}</p>
                                <div value={bike._id}>
                                    <button type="submit" className="btn btn-danger"  onClick={this.handleSubmit} >Cancel rent</button>
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
        rented_bikes: state.mainReducer.rented_bikes
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ getBikesData }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RentedBikes);