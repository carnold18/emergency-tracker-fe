import React, { Component } from 'react';

class UserTypeButton extends Component {

    submitAdminRequest = () => {
        console.log('Request Submitted')
        // fetch("https://emergency-tracker.herokuapp.com/users/"+this.state.currentUser.id, {
        //     method: "PATCH",
        //     body: JSON.stringify({
        //         user_type: 1
        //     }),
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${localStorage.token}`
        //     }
        // })
    }

    render() {
        return (
            <div>
                <button type="button" className="button large" onClick={this.submitAdminRequest}>Request Admin Status</button><br /><br />
            </div>
        )
    }

}

export default UserTypeButton;