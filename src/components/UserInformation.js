import React, { Component } from 'react';
import EditUserForm from './EditUserForm';
import UserTypeButton from './UserTypeButton';
import UserStatusButton from './UserStatusButton';

class UserInformation extends Component {

    state = {
        editUser: false
    }

    changeEditState = () => {
        console.log("hey")
        this.setState({
            editUser: !this.state.editUser
        })
    }

    render() {
        return(
            <div className="userinformation">
                <div>
                    {/* <h2>Welcome, {this.props.currentUser.first_name}</h2> */}
                    <div>
                        <UserStatusButton currentUser={this.props.currentUser} />
                    </div>
                    <div>
                        <h3>{this.props.currentUser.address_line_1}</h3>
                        <h3>{this.props.currentUser.address_line_2}</h3>
                        <h3>{this.props.currentUser.city}, {this.props.currentUser.state} {this.props.currentUser.zip_code}</h3>
                        <h3>{this.props.currentUser.phone_number}</h3>
                    </div>
                    <div>
                        <h5 id="div1">Change of Address?</h5>
                        <button type="button" className="button small" onClick={this.changeEditState}>Update Account</button><br /><br />
                    </div>
                    
                    { this.state.editUser ? 
                        ( <EditUserForm currentUser={this.props.currentUser} /> )
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default UserInformation;