import React, { Component } from 'react';
import red from '../assets/red-circle-64.png';
import green from '../assets/green-circle-64.png';
import yellow from '../assets/yellow-circle-64.png';

class ZoneMessages extends Component {

    state = {
        posts: [],
        postsCreated: false
    }

    componentDidMount() {

        fetch("https://emergency-tracker.herokuapp.com/posts", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
      .then(response => response.json())
      .then(posts => {
          this.setState({
            posts: posts,
            postsCreated: true
        })
      })
        
    }

    render() {
        console.log(this.state.posts)
        return (
            <div>
            <h2>Messages for {this.props.currentUser.zip_code}</h2>
            <div class="highlights">
                
                { this.state.postsCreated ? this.state.posts.map(post => (
                    <div >
                        <section>
                            <div class="content">
                                <header>
                                    <a href="#" class="icon fa-envelope-o"><span class="label">Icon</span></a>
                                    <h3>Your Area's Status:</h3>
                                    {
                                        <div style={{margin:"2em"}}>
                                            {post.status === 0 ? (
                                                <img src={green} alt="no emergency" width="65"/>
                                            ) : null }
                                            {post.status === 1 ? (
                                                <img src={yellow} alt="mid emergency" width="65" />
                                            ) : null }
                                            {post.status === 2 ? (
                                                <img src={red} alt="high emergency" width="65" />
                                            ) : null }
                                        </div>
                                    }
                                    <h3>Post: {post.message}</h3>
                                    <h3>Date Posted: {post.created_at.split("").splice(0,10).join("")}</h3>
                                </header>
                            </div>
                        </section>
                    </div>
                    )) : <p>Currently no messages.</p>
                }
            </div>
            </div>
        )
    }
}

export default ZoneMessages;