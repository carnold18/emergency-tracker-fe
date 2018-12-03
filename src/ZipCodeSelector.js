import React, { Component } from 'react';
import Select from 'react-select';

class ZipCodeSelector extends Component {

    state = {
        selectedZone: null,
        selectedZones: [],
        userZones: []
    }

    handleChange = async (selectedZone) => {
        debugger
        await this.props.allZones.forEach( zone => 
            ( zone.zip_code === selectedZone.value ? 
                this.setState({
                    userZones: [zone,...this.state.userZones],
                    selectedZone: selectedZone,
                    selectedZones: [selectedZone, ...this.state.selectedZones]
                }) : null ) )
        console.log(`Zone selected:`, selectedZone)
        console.log(this.state.userZones)

        // await this.createUserZone()

        // this.props.getZoneUsers(selectedZone)

    }

    createUserZone = () => {
        // debugger
        console.log(this.props.currentUser.id)
        console.log(this.state.userZones[0].id)
        fetch("http://localhost:3000/user_zones", {
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


    render() {
        const options = []
        this.props.allZones.map(zone => (
            options.push({ value: `${zone.zip_code}`, label: `${zone.zip_code}` })
        ))
        // console.log(options) 

        return (
            <Select value={this.selectedZone} options={options} onChange={(this.handleChange)} />
        )
    }
}

export default ZipCodeSelector;