import React, { Component } from 'react';
import Logout from './Logout';

class NavBar extends Component {

    render() {
        return (
            <header id="header">
				<a class="logo" href="index.html">Welcome, {this.props.currentUser.first_name}</a>
                <a href="/user">Home</a>
                {this.props.currentUser ?
                    (<a href="/admin">Admin Stats</a>) : (null)
                }
                <Logout {...this.props} logOut={this.props.logOut} />
				{/* <nav>
					<a href="#menu">Menu</a>
				</nav> */}
			</header>
        )
    }
}

export default NavBar;