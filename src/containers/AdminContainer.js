import React, { Component } from 'react';
import Map from '../components/Map';
import ZipCodeSelectorNew from '../components/ZipCodeSelectorNew';
import NavBar from '../components/NavBar';
import MessagePost from '../components/MessagePost';
import StatsChart from '../components/StatsChart';
import { BACKEND_URL } from '../Constants';
// import { GEO_API_KEY } from "./Constants";
// import config from './config.js';

class AdminContainer extends Component {

    state = {
        zoneUsers: [],
        selectedZone: null,
        selectedZones: [],
        userZones: [],
        zipCodes: [],
        zoneShow: false,
        checkedArray: [],
        newUserArrayList: 0,
        statusSum: 0,
        status0Count: 0,
        status1Count: 0,
        status2Count: 0,
        zeroPerc: 0,
        onePerc: 0,
        twoPerc: 0,
        statsSelected: false
    }
    

    // handleChange = async (selectedZone) => {
    //     // debugger
    //     await this.props.allZones.forEach( zone => 
    //         ( zone.zip_code === selectedZone.innerText ? 
    //             this.setState({
    //                 userZones: [zone, ...this.state.userZones],
    //                 selectedZone: selectedZone.innerText,
    //                 selectedZones: [selectedZone.innerText, ...this.state.selectedZones]
    //             }) : null ) )
    //     // console.log(`Zone selected:`, selectedZone.innerText)
    //     // console.log(this.state.userZones)

    //      await this.createUserZone()

    //      await this.getZoneUsers()
    //     // this.props.getZoneUsers(selectedZone)
    // }

    handleChange = async (e) => {
        // debugger
        await this.props.allZones.forEach( zone => 
            ( zone.zip_code === e.target.name 
                // && this.state.selectedZones.includes(e.target.name) !== true
                ? 
                this.setState({
                    userZones: [zone, ...this.state.userZones],
                    selectedZone: e.target.name,
                    selectedZones: this.state.checkedArray
                }) : null ) )
        // console.log(`Zone selected:`, e.target.name)
        // console.log(this.state.userZones)

         await this.createUserZone();
            
         await this.getZoneUsers();
        // this.props.getZoneUsers(selectedZone)
    }

    // updateZoneUsers = () => {
    //     this.state.checkedArray.includes()
    // }

    //use a filter to filter out all zones that do not match the id of the selected zone, when un-rendering.

    createUserZone = () => {
        console.log(this.props.currentUser.id)
        console.log(this.state.userZones[0].id)
        console.log("BACKEND_URL: ", BACKEND_URL+"user_zones")
        // fetch("https://emergency-tracker.herokuapp.com/user_zones", {
        fetch(BACKEND_URL+"user_zones", {
                method: "POST",
                body: JSON.stringify({
                    user_id: this.props.currentUser.id,
                    zone_id: this.state.userZones[0].id
                  }),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`
                  }
            })
            // console.log('post sent to backend to create UserZone')
    }

    getZoneUsers = () => {
        const currentZones = this.state.userZones.map( zone => {
            return zone.id
        });
        const id = this.state.userZones[0].id;
        const userList = this.state.zoneUsers.flat(Infinity);
        const currentUsers = userList.map( user => {
            return user.id
        });
        

        console.log(`Current Zone List:`, currentZones)

            // fetch("https://emergency-tracker.herokuapp.com/zoneUsers", {
            fetch(BACKEND_URL+"zoneUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                id: id
            })
            })
                .then(response => response.json())
                .then(users => {
                    // console.log(`Includes user?`, currentUsers.includes(users[0].id))
                    console.log("currentUsers:", currentUsers)
                    console.log("Before: this.state.zoneUsers", this.state.zoneUsers)

                    if (users.length > 0 && currentUsers.includes(users[0].id)) {
                        this.setState({
                            zoneUsers: userList.filter(userObj => !users.find(userObj2 => userObj.id === userObj2.id))
                        })
                    }
                    else {
                        this.setState({
                            zoneUsers: [users, ...this.state.zoneUsers]
                        })
                    }
                    console.log("After: this.state.zoneUsers", this.state.zoneUsers)
                })
    }

    // getZoneUsers = () => {

    //     const currentZones = this.state.userZones.map( zone => {
    //         return zone.id
    //     })

    //     const id = this.state.userZones[0].id
        
    //     const flattenedUsers = []
    //     const flattenUsers = () => {
    //         // console.log("flattenedUsers", flattenedUsers)
    //         for (let i = 0; i < this.state.zoneUsers.length; ++i) {
    //             for (let j = 0; j < this.state.zoneUsers[i].length; ++j) (
    //                 flattenedUsers.push(this.state.zoneUsers[i][j])
    //             )
    //         }
    //         return flattenedUsers
    //     }

    //     console.log("flattenUsers():", flattenUsers())
    //     console.log("flattenedUsers:", flattenedUsers)

    //     const userList = flattenUsers()
    //     const currentUsers = flattenUsers().map( user => { return user.id })

    //     console.log(`Current Zone List:`, currentZones)

    //         fetch("https://emergency-tracker.herokuapp.com/zoneUsers", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${localStorage.token}`
    //             },
    //             body: JSON.stringify({
    //                 id: id
    //             })
    //         })
    //             .then(response => response.json())
    //             .then(users => {
    //                 // console.log("users", users)

    //                 console.log(`Includes user?`, currentUsers.includes(users[0].id))
    //                 console.log("users.length", users.length)
    //                 console.log("currentUsers:", currentUsers)
    //                 console.log("this.state.zoneUsers Before:", this.state.zoneUsers)

    //                 if (users.length > 0 && currentUsers.includes(users[0].id)) {
    //                     this.setState({
    //                         zoneUsers: userList.filter(userObj => !users.find(userObj2 => userObj.id === userObj2.id))
    //                     })
    //                 }
    //                 else {
    //                     this.setState({
    //                         zoneUsers: [users, ...this.state.zoneUsers]
    //                     })
    //                 }

    //                 console.log("this.state.zoneUsers After:", this.state.zoneUsers)

    //             })
    // }

    checkBoxDetails = async () => {
        // console.log(this.props.allZones)
        const zipCodes = await this.props.allZones.map( zone => {
             return { name:zone.zip_code, key: zone.zip_code, label: zone.zip_code }
         })
        
        await this.setState({
            zipCodes: zipCodes,
            zoneShow: !this.state.zoneShow
        })
    }

    handleChecks = (e) => {

        const item = e.target.name;
        const index = this.state.checkedArray.indexOf(item);

        this.handleChange(e);

        this.state.checkedArray.includes(item) ? (
            this.state.checkedArray.splice(index, 1)
              ) : (
                this.state.checkedArray.push(item)
          )
        //   console.log(this.state.checkedArray)
    }

    emergencyStatusSum = () => {
        let status = [];
        let sum = 0;

        for (let i = 0; i < this.state.zoneUsers.flat(Infinity).length; i++) {
            status.push(this.state.zoneUsers.flat(Infinity)[i].status)
        }
        
        for (let k = 0; k < status.length; k++) {
            sum = sum + status[k]
        }

        this.setState({
            statusSum: this.state.zoneUsers.flat(Infinity).length
        })

        console.log("status:", status)
        console.log("sum", sum)

    }
    
    statusCount = () => {

        let other_count = 0;
        let two_count = 0;
        let one_count = 0;
        let zero_count = 0;

        for (let i = 0; i < this.state.zoneUsers.flat(Infinity).length; i++) {
            if (this.state.zoneUsers.flat(Infinity)[i].status === 2) {
                two_count++;
            } else if (this.state.zoneUsers.flat(Infinity)[i].status === 1) {
                one_count++;
            } else if (this.state.zoneUsers.flat(Infinity)[i].status === 0) {
                zero_count++;
            } else if (this.state.zoneUsers.flat(Infinity)[i].status > 2) {
                other_count++;
            } else return null;
        }

        console.log(`Status 0 Total:`, zero_count)
        console.log(`Status 1 Total:`, one_count)
        console.log(`Status 2 Total:`, two_count)
        console.log(`Status 2 Total:`, other_count)

        this.setState({
            two_count: two_count,
            one_count: one_count,
            zero_count: zero_count,
            other_count: other_count
        })
    }

    calculateStats = async () => {

        await this.emergencyStatusSum();
        await this.statusCount();

        const zero = this.state.zero_count/(this.state.statusSum-this.state.other_count)*100
        const one = this.state.one_count/(this.state.statusSum-this.state.other_count)*100
        const two = this.state.two_count/(this.state.statusSum-this.state.other_count)*100

        this.setState({
            zeroPerc: zero,
            onePerc: one,
            twoPerc: two,
            statsSelected: !this.state.statsSelected
        })

        console.log(`Status 0 %:`, this.state.zeroPerc)
        console.log(`Status 1 %:`, this.state.onePerc)
        console.log(`Status 2 %:`, this.state.twoPerc)

    }

    render() {
        // console.log(this.state.zipCodes)
        console.log(`UserZones:`, this.state.userZones)
        console.log(`ZoneUsers:`, this.state.zoneUsers)
        // console.log(this.props.currentUser.id)
        // console.log(this.props.currentUser.user_type)
        // console.log(this.props.currentUser.zone_id)
        // console.log(GEO_API_KEY)
        // console.log(`${process.env.REACT_APP_GEO_API_KEY}`)
        const API_KEY =`${process.env.REACT_APP_GEO_API_KEY}`
        // console.log(API_KEY)
        const URL = 'https://maps.googleapis.com/maps/api/js?key='+API_KEY+'&v=3.exp&libraries=geometry,drawing,places'

        return (
            
            <div>
                { this.props.currentUser.user_type > 0 ? (
                    <div>
                        <NavBar {...this.props} currentUser={this.props.currentUser} logOut={this.props.logOut} /><br />
                        <span id="admin-container">
                            <div className="a">
                                <br /><h4>View All Registered Users Per Zone</h4>
                                <p id="select-zones" onClick={this.checkBoxDetails}>Select Zones:</p>

                                { this.state.zoneShow ? 
                                    
                                    ( <ZipCodeSelectorNew checkedItems={this.state.checkedItems} handleChecks={this.handleChecks} allZones={this.props.allZones} currentUser={this.props.currentUser} handleChange={this.handleChange} zipCodes={this.state.zipCodes} /> )
                                    : null

                                }
                            </div>
                            <div id="spacer"></div>
                            <div className="b">
                                <Map zoneUsers={this.state.zoneUsers} googleMapURL={URL}
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                /><br />
                                <button type="button" className="button small" onClick={this.calculateStats} style={{marginLeft:'-200px'}} >Show Stats</button><br />
                                { this.state.statsSelected ? (
                                    <StatsChart selectedZones={this.state.selectedZones} zeroPerc={this.state.zeroPerc} onePerc={this.state.onePerc} twoPerc={this.state.twoPerc}/>) : null
                                }
                                <MessagePost currentUser={this.props.currentUser} zipCodes={this.state.zipCodes} selectedZones={this.state.selectedZones} />
                            </div>
                        </span>
                    </div>
                ) : <p>User access denied. Please request admin status to view.</p>
                }
            </div>
        )
    }
}

export default AdminContainer;