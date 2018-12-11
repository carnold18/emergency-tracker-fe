import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React, { Component } from 'react';

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allLatsAvg: 29.7604,
            allLngAvg: -95.3698
        }
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
        const users = this.props.zoneUsers
        const userz = this.props.zoneUsers.flat()
        const flattenUsers = () => {
            console.log("flattenUsers", users.flat())
            return users.flat()
        }

        const markerFunction = user => {
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
                                        icon={{ url: yellow }} 
                                        /> 
                break;
                case 2: 
                return <Marker position={{ lat: user.lat, lng: user.lng }} 
                                        opacity={0.7} 
                                        icon={{ url: red }} 
                                        /> 
                break;
                default: 
                return null
                break;
            }
        }


        

    // can use .reduce to calculate the average lat and lng of of the user pins and the set this to 
    // the default center lat and lng below

    // placed all verisons of the following function in commented code below the export default
    // some of them work. some of them do not. BEWARE. --- trial and error

        return (
            <div>
            <GoogleMap 
                id="map"
                defaultZoom={13} 
                center={{ lat: this.state.allLatsAvg, lng: this.state.allLngAvg }}
            >
                { 
                    flattenUsers().map(markerFunction)
                } 
            </GoogleMap><br />
            <button type="button" className="button small" onClick={ this.createNewGeoLatCenter } style={{marginLeft:'200px'}}>Recenter Map</button>
            </div>
        )
    }
}

export default withScriptjs(withGoogleMap(Map));




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