import React, { Component } from 'react';
import '../style.css';

class InputField extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {
        this.props.onInputValueChange(event.target.value);
    }

    render() {
        return (
            <div className = {this.props.class}>
                <label>{this.props.text}</label>
                <input className="form-control" type = {this.props.type} placeholder = {`Enter ${this.props.text.toLowerCase()}`} onChange={this.handleChange} />
            </div>
        );
    }
}

export default InputField;
            
