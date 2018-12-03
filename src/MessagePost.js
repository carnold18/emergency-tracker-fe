import React, { Component } from 'react';

class MessagePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            zoneIds: []
        }
    }

    generateZones = (e) => {
        e.preventDefault();
        // debugger

        const zoneIds = this.props.selectedZones.map( zone => (
             parseInt(zone.split("").slice(2).join(""))
         ))

        this.setState({zoneIds: zoneIds}, () => this.submitPost())

        console.log(this.state.zoneIds)

    }

    // grab array of all selected zones and iterate over each one to send a POST to create a 
    // zone-specific message

    submitPost = () => {

        //e.preventDefault();

        // this.generateZones();
        console.log(this.state.zoneIds)
        
        for (let i = 0; i < this.state.zoneIds.length; i++) {
            fetch("http://localhost:3000/posts", {
                method: "POST",
                body: JSON.stringify({
                    message: this.state.message,
                    status: 0,
                    zone_id: this.state.zoneIds[i]
                  }),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`
                  }
            })
        }
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
        console.log(event.target.value)
    };

    showZones = () => {
        for (let i=0; i < this.props.selectedZones.length; i++) {
        return <li>{this.props.selectedZones[i]}</li>
    }}

    render() {

        return (
            <div className="header">
                <br /><h4 className="align-center">Send notifications to users in selected zones:</h4>
                <ul>{this.showZones}</ul>
                <div className="login">
                    <form onSubmit={e => this.generateZones(e)}>
                        <input
                            type="text"
                            onChange={this.handleChange}
                            placeholder="Message"
                            name="message"
                            style={{display:"inline-block"}}
                        />
                        <input type="submit" className="button small" style={{display:"inline-block", margin:"2px"}}/>
                    </form>
                </div>
            </div>
        )
    }
}

export default MessagePost;