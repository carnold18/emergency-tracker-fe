import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

class StatsChart extends Component {
    
    render() {
        console.log(this.props.selectedZones)
        return(
            // <div>
            //     <Chart 
            //         chartType="Histogram"
            //         width={'500px'}
            //         height={'350px'}
            //         loader={<div>Loading Chart</div>}
            //         data={[
            //             ["User Status", "Value"],
            //             ["OK", "green"],
            //             ["Distress", "yellow"],
            //             ["Danger", "red"]
            //         ]}
            //     />
            // </div>
            <div id="stats-chart">
                <br /><h3>Selected Zone Percentages</h3>
                { this.props.selectedZones.map(zone => {
                            return <li id='selected-zones'>{zone}</li>})
                }
                <div className="table-wrapper">
                <table className="alt">
                    {/* <tr>
                        <td>Selected Zone Percentages</td>
                    </tr> */}
                    <tr>
                        <td>{Math.round(this.props.zeroPerc)}% OK</td>
                    </tr>
                    <tr>
                        <td>{Math.round(this.props.onePerc)}% Distress</td>
                    </tr>
                    <tr>
                        <td>{Math.round(this.props.twoPerc)}% Danger</td>
                    </tr>
                </table>
                </div>
            </div>
        )
    }
}

export default StatsChart;