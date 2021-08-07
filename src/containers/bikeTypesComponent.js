import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.css';
import { bindActionCreators } from 'redux';
import {getBikesData} from '../action-creators/FetchBikesData';

class BikeType extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        const url = 'http://localhost:8000/bikes/types';
        const action = 'GET_BIKE_TYPES'
        this.props.getBikesData(url,action)
    }
    handleChange(event) {
        this.props.onBikeTypeChange(event.target.value);
    }

    render() {
        return (
            <div className="form-group">
                <label>Bike type</label>
                <select className="form-control" onChange={this.handleChange}>
                    {this.props.bike_types.map((type,index) => 
                        <option 
                            value = {type.title} 
                            key ={index}
                        >
                            {type.title}
                        </option> 
                    )}
                </select>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        bike_types: state.mainReducer.bike_types
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ getBikesData }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BikeType);
            
            
            