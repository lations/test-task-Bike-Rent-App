import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData } from '../action-creators/FetchBikesData';
import { getBikesData } from '../action-creators/FetchBikesData';
import InputField from './inputComponent'
import BikeType from './bikeTypesComponent'

class RentForm extends React.Component {
    constructor(props){
        super(props)
         this.handleSubmit = this.handleSubmit.bind(this)
         this.bikeTypeChange = this.bikeTypeChange.bind(this)
         this.handlePriceChange =  this.handlePriceChange.bind(this)
         this.handleNameChange = this.handleNameChange.bind(this)
         this.state = {bikeType: 'Road bike', bikeName: '', bikePrice:0};
    }

    handlePriceChange (value) {
        this.setState({bikePrice:value});
    }

    handleNameChange (value) {
        this.setState({bikeName:value});
    }

    bikeTypeChange(value) {
        this.setState({bikeType:value});
    }


    handleSubmit (event) {
        event.preventDefault();
        const value = {
            name: this.state.bikeName,
            type:this.state.bikeType,
            price:this.state.bikePrice
        };
        const url = 'http://localhost:8000/bikes';
        const method = 'POST';
        const action = 'GET_BIKE_LIST'
        if (!value.name || !value.price ) {
            alert('Please fill the inputs.');
            return;
        }
        fetchData(url,value,method);
        this.props.getBikesData(url,action);
    }

    render() {
        return (
        <div className = "rent-form">
            <h4><span role="img" aria-label = 'money-mouth face'>
                    {String.fromCodePoint(0x1F4DD)}
                </span>
                {' Create new rent'}</h4>
            <div className = 'form-container' >
                <form className="form-row" onSubmit={this.handleSubmit} >
                        <InputField
                            class="form-group"  
                            onInputValueChange = {this.handleNameChange}
                            type = 'text'
                            text = 'Bike name'
                        />
                        <BikeType 
                            onBikeTypeChange = {this.bikeTypeChange}/>
                        <InputField  
                            class="form-group"
                            onInputValueChange = {this.handlePriceChange}
                            type = 'number'
                            text = 'Price'
                        />
                        <div className="form-group">
                            <button type="submit" className="btn btn-success"  >Add bike</button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getBikesData }, dispatch);
}

export default connect(null , mapDispatchToProps)(RentForm);
