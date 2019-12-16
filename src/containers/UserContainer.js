import React, { Component } from 'react';
import './App.css';
import Dropdown from '../components/Dropdown';
import UserTypeButton from '../UserTypeButton';
import ZoneMessages from '../ZoneMessages';
import UserInformation from '../UserInformation';
import NavBar from '../NavBar';
import Header from '../Header';

class UserContainer extends Component {

    render() {
        return(
            <div>
            <NavBar {...this.props} currentUser={this.props.currentUser} logOut={this.props.logOut} />
            <Header />
            <section class="wrapper">
				<div class="inner">
					<header class="special">
                    <ZoneMessages currentUser={this.props.currentUser} />
						<div className="useraddress">
                            <Dropdown changeStatus0={this.props.changeStatus0} changeStatus1={this.props.changeStatus1} changeStatus2={this.props.changeStatus2} />
                            <UserInformation currentUser={this.props.currentUser} />
                            <UserTypeButton currentUser={this.props.currentUser} />
                        </div>
					</header>
					{/* <div class="highlights">
						<section>
							<div class="content">
								<header>
									<a href="#" class="icon fa-vcard-o"><span class="label">Icon</span></a>
									<h3>Feugiat consequat</h3>
								</header>
								<p>Nunc lacinia ante nunc ac lobortis ipsum. Interdum adipiscing gravida odio porttitor sem non mi integer non faucibus.</p>
							</div>
						</section>
                    </div> */}
                </div>
               </section> 
            {/* { this.props.currentUser ? (
            <div className="user">
                
            </div>
            ) : (null) } */}
            </div>
        );
    }
}

export default UserContainer;