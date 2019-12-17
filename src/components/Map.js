import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import React, { Component } from 'react';
import info from '../assets/info-24.png';

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allLatsAvg: 29.7604,
            allLngAvg: -95.3698,
            isOpen: false
        }
    }

    handleToggleOpen = () => {

        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    createNewGeoLatCenter = () => {
      
        const allLats = []
        let sum = 0;

        for (let i = 0; i < this.props.zoneUsers.length; i++) {
            for (let j = 0; j < this.props.zoneUsers[i].length; j++) {
                allLats.push(this.props.zoneUsers[i][j].lat)
            }
        }
         for(let k = 0; k < allLats.length; k++){
             sum = sum + allLats[k]
         }
    
        let avg = sum/allLats.length

        this.setState({allLatsAvg: avg}, () => console.log(this.state.allLatsAvg))
        
        this.createNewGeoLngCenter()
    }

    createNewGeoLngCenter = () => {
      
        const allLng = []
        let sum = 0;

        for (let i = 0; i < this.props.zoneUsers.length; i++) {
            for (let j = 0; j < this.props.zoneUsers[i].length; j++) {
                allLng.push(this.props.zoneUsers[i][j].lng)
            }
        }
         for(let k = 0; k < allLng.length; k++){
             sum = sum + allLng[k]
         }
    
        let avg = sum/allLng.length

        this.setState({allLngAvg: avg}, () => console.log(this.state.allLngAvg))
    }

    render() {
        // console.log(this.props.zoneUsers.flat())
        const green = "http://maps.google.com/mapfiles/ms/icons/green.png"
        const yellow = "http://maps.google.com/mapfiles/ms/icons/yellow.png"
        const red = "http://maps.google.com/mapfiles/ms/icons/red.png"
        const users = this.props.zoneUsers.flat(Infinity)

    // can use .reduce to calculate the average lat and lng of of the user pins and the set this to 
    // the default center lat and lng below
        return (
            <div>
            <GoogleMap 
                id="map"
                defaultZoom={13}
                center={{ lat: this.state.allLatsAvg, lng: this.state.allLngAvg }}
            >
                {  users.map(user => {
                        switch(user.status) {
                            case 0: 
                            return <Marker position={{ lat: user.lat, lng: user.lng }} 
                                                    opacity={0.5} 
                                                    icon={{ url: green }}  
                                                    /> 
                            break;
                            case 1: 
                            return <Marker position={{ lat: user.lat, lng: user.lng }} 
                                                    opacity={0.7} 
                                                    icon={{ url: yellow }} /> 
                            break;
                            case 2: 
                            return <Marker position={{ lat: user.lat, lng: user.lng }} 
                                                    opacity={0.7} 
                                                    icon={{ url: red }} /> 
                            break;
                            default: 
                            return <Marker position={{ lat: user.lat, lng: user.lng }} 
                                                    opacity={1.0} 
                                                    icon={{ url: info }} 
                                                    onClick={() => this.handleToggleOpen()} >
                                                    {
                                                        this.state.isOpen &&
                                                        <InfoWindow className="no">
                                                            <div style={{padding:"0"}}>
                                                                <h5>-- Deployment Center --</h5>
                                                                <h6>{user.first_name}</h6>
                                                                <h6>{user.address_line_1}_{user.address_line_2}</h6>
                                                                <h6>{user.phone_number}</h6>
                                                            </div>
                                                        </InfoWindow>
                                                    }
                                    </Marker> 
                            break;
                        }
                    })
                } 
            </GoogleMap><br />
            <button type="button" className="button small" onClick={ this.createNewGeoLatCenter } style={{marginLeft:'200px'}}>Recenter Map</button>
            </div>
        )
    }

    // render() {

    //     // These are marker icons from google's database.
    //     const green = "http://maps.google.com/mapfiles/ms/icons/green.png"
    //     const yellow = "http://maps.google.com/mapfiles/ms/icons/yellow.png"
    //     const red = "http://maps.google.com/mapfiles/ms/icons/red.png"
        
    //     // Creating an array of all selected users to display on the map.
    //     const flattenedUsers = []
    //     const flattenUsers = () => {
    //         console.log("this.props.zoneUsers", this.props.zoneUsers)
    //         for (let i = 0; i < this.props.zoneUsers.length; ++i) {
    //             for (let j = 0; j < this.props.zoneUsers[i].length; ++j)
    //                 flattenedUsers.push(this.props.zoneUsers[i][j]);
    //             }
    //         console.log("flattenedUsers", flattenedUsers)
    //         return flattenedUsers
    //     }
    //     flattenUsers()

    //     // Creating markers associated with each user that was selected.
    //     const markerFunction = user => {
    //         switch(user.status) {
    //             case 0: 
    //             return <Marker position={{ lat: user.lat, lng: user.lng }} 
    //                                     opacity={0.5} 
    //                                     icon={{ url: green }}  
    //                                     /> 
    //             break;
    //             case 1: 
    //             return <Marker position={{ lat: user.lat, lng: user.lng }} 
    //                                     opacity={0.7} 
    //                                     icon={{ url: yellow }} 
    //                                     /> 
    //             break;
    //             case 2: 
    //             return <Marker position={{ lat: user.lat, lng: user.lng }} 
    //                                     opacity={0.7} 
    //                                     icon={{ url: red }} 
    //                                     /> 
    //             break;
    //             default: 
    //             return null
    //             break;
    //         }
    //     }

    //     return (
    //         <div>
    //         <GoogleMap 
    //             id="map"
    //             defaultZoom={13} 
    //             center={{ lat: this.state.allLatsAvg, lng: this.state.allLngAvg }} >
    //                 { flattenedUsers ? (
    //                     flattenedUsers.map(markerFunction) ) : null
    //                 }
    //         </GoogleMap><br />
    //         <button type="button" className="button small" onClick={ this.createNewGeoLatCenter } style={{marginLeft:'200px'}}>Recenter Map</button>
    //         </div>
    //     )
    // }
}

export default withScriptjs(withGoogleMap(Map));



// placed all verisons of the following function in commented code below the export default
// some of them work. some of them do not. BEWARE. --- trial and error

// users.map(user => {
//     return user.status === 1 && user.status !== 0 ? (
//         <Marker position={{ lat: user.lat, lng: user.lng }} 
//                                 opacity={0.7} 
//                                 icon={{ url: yellow }} /> 
//     ) : (
//         <Marker position={{ lat: user.lat, lng: user.lng }} 
//                                 opacity={0.7} 
//                                 icon={{ url: red }} /> 
//     )
// })

// (function(users) {
//     for (var i in users) {
//         switch(users[i].status) {
//             case 0: 
//             return <Marker position={{ lat: users[i].lat, lng: users[i].lng }} 
//                                     opacity={0.5} 
//                                     icon={{ url: green }}  
//                                     /> 
//             break;
//             case 1: 
//             return <Marker position={{ lat: users[i].lat, lng: users[i].lng }} 
//                                     opacity={0.7} 
//                                     icon={{ url: yellow }} /> 
//             break;
//             case 2: 
//             return <Marker position={{ lat: users[i].lat, lng: users[i].lng }} 
//                                     opacity={0.7} 
//                                     icon={{ url: red }} /> 
//             break;
//             default: 
//             return null
//             break;
//         }
//     }})()

// (function() {
//     return users.map(function(user) {
//         switch(user.status) {
//             case 0: 
//             return <Marker position={{ lat: user.lat, lng: user.lng }} 
//                                     opacity={0.5} 
//                                     icon={{ url: green }}  
//                                     /> 
//             break;
//             case 1: 
//             return <Marker position={{ lat: user.lat, lng: user.lng }} 
//                                     opacity={0.7} 
//                                     icon={{ url: yellow }} /> 
//             break;
//             case 2: 
//             return <Marker position={{ lat: user.lat, lng: user.lng }} 
//                                     opacity={0.7} 
//                                     icon={{ url: red }} /> 
//             break;
//             default: 
//             return null
//             break;
//         }
//     })
//     })()

// var arrays = [["$6"], ["$12"], ["$25"], ["$25"], ["$18"], ["$22"], ["$10"]];
// var merged = [].concat.apply([], arrays);
// var merged = [].concat(...arrays);