import React, { Component } from 'react';
import Map from './Map';
// import ZipCodeSelector from './ZipCodeSelector';
import ZipCodeSelectorNew from './ZipCodeSelectorNew';
import NavBar from './NavBar';
import MessagePost from './MessagePost';
import StatsChart from './StatsChart';
// import { GEO_API_KEY } from "./ApiKey";
import dotenv from 'dotenv';
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
        fetch("https://emergency-tracker.herokuapp.com/user_zones", {
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
        const currentUsers = this.state.zoneUsers.flat().map( user => {
            return user.id
        });
        const userList = this.state.zoneUsers.flat();

        console.log(`Current Zone List:`, currentZones)

            fetch("https://emergency-tracker.herokuapp.com/zoneUsers", {
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
                })
    }

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

        for (let i = 0; i < this.state.zoneUsers.flat().length; i++) {
            status.push(this.state.zoneUsers.flat()[i].status)
        }
        
        for (let k = 0; k < status.length; k++) {
            sum = sum + status[k]
        }

        this.setState({
            statusSum: sum
        })

        console.log(sum)

    }
    
    statusCount = () => {

        let two_count = 0;
        let one_count = 0;
        let zero_count = 0;

        for (let i = 0; i < this.state.zoneUsers.flat().length; i++) {
            if (this.state.zoneUsers.flat()[i].status === 2) {
                two_count++;
            } else if (this.state.zoneUsers.flat()[i].status === 1) {
                one_count++;
            } else if (this.state.zoneUsers.flat()[i].status === 0) {
                zero_count++;
            } else return null;
        }

        console.log(`Status 0 Total:`, zero_count)
        console.log(`Status 1 Total:`, one_count)
        console.log(`Status 2 Total:`, two_count)

        this.setState({
            two_count: two_count,
            one_count: one_count,
            zero_count: zero_count
        })
    }

    calculateStats = async () => {

        await this.emergencyStatusSum();
        await this.statusCount();

        const zero = this.state.zero_count/this.state.statusSum*100
        const one = this.state.one_count/this.state.statusSum*100
        const two = this.state.two_count/this.state.statusSum*100

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

    loadApiKey = () => {
        dotenv.load();
    }
    

    render() {

        this.loadApiKey();
        // console.log(this.state.zipCodes)
        console.log(`UserZones:`, this.state.userZones)
        console.log(`ZoneUsers:`, this.state.zoneUsers)
        // console.log(this.props.currentUser.id)
        // console.log(this.props.currentUser.user_type)
        // console.log(this.props.currentUser.zone_id)
        console.log(GEO_API_KEY)
        // console.log(dotenv)
        console.log(process)
        console.log(process.env)
        console.log(process.env.production)
        const API_KEY = GEO_API_KEY
        console.log(API_KEY)
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
                                <button type="button" className="button small" onClick={this.calculateStats} style={{marginLeft:'-200px'}} >Show Stats</button>
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