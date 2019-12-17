import React, { Component } from 'react';
import red from '../assets/red-circle-64.png';
import green from '../assets/green-circle-64.png';
import yellow from '../assets/yellow-circle-64.png';

class UserStatusButton extends Component {

    render() {
        return(
            <div style={{margin:"2em"}}>
            {this.props.currentUser.status === 0 ? (
                <img src={green} alt="no emergency" width="90"/>
            ) : null }
            {this.props.currentUser.status === 1 ? (
                <img src={yellow} alt="mid emergency" width="90" />
            ) : null }
            {this.props.currentUser.status === 2 ? (
                <img src={red} alt="high emergency" width="90" />
            ) : null }
            </div>
        )
    }

}

export default UserStatusButton;