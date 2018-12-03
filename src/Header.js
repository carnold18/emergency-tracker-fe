import React, { Component } from 'react';

class Header extends Component {

    render() {
        return(
            <section id="banner">
				<div class="inner">
					<h1>MobilEyes Houston</h1>
					<p>Emergency Response Tracking & Resource Deployment Application<a href="https://templated.co/"></a> </p>
				</div>
				<video autoplay loop muted playsinline src="images/banner.mp4"></video>
			</section>
        )
    }
}

export default Header;