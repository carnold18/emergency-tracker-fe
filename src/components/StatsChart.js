import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

class StatsChart extends Component {
    
    render() {
        console.log(this.props.selectedZones)
        return(
            <div className="chart">
                <h3 style={{"margin-top":"20px"}}>Selected Zone(s):</h3>
                {
                    this.props.selectedZones.map( zone => {
                        return <p id="selected-zone">{zone}</p>
                    })
                }
                <div style={{"margin-left":"62px"}}>
                <Chart
                    width={'500px'}
                    height={'360px'}
                    chartType="PieChart"
                    loader={<div>...Loading Chart...</div>}
                    data={[
                        ['Status', 'Percentage'],
                        ['Ok', this.props.zeroPerc],
                        ['Distress', this.props.onePerc],
                        ['Danger', this.props.twoPerc],
                    ]}
                    options={{
                        title: "Summary of Users' Statuses",
                        // Just add this option
                        is3D: false,
                        slices: [
                            {
                            color: "green",
                            opacity: 0.3
                            },
                            {
                            color: "yellow",
                            opacity: 0.3
                            },
                            {
                            color: "red",
                            offset: 0.2,
                            opacity: 0.3
                            },
                        ],
                        backgroundColor: "none",
                        pieSliceTextStyle: { color: "black", fontSize: 15},
                        titleTextStyle: { fontSize: 18, fontName: "Raleway", bold: false }

                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
                </div>
            </div>
        )
    }
}

export default StatsChart;


