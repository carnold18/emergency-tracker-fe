import React, { Component } from 'react';
import './App.css';

class Logout extends Component {

    render() {
        
        return(
            <a onClick={event => this.props.logOut(event)}>Logout</a>
        )
    }
}

export default Logout;