"use client"

import ReactECharts from 'echarts-for-react';  // Import the React wrapper
import * as echarts from 'echarts/core';       // Import the core of ECharts
import { LineChart } from 'echarts/charts';    // Import the chart type you need




import React, { Component } from 'react';
class MyComponent extends Component {  
  render() {
    const option = {
      title: {
        text: 'ECharts entry example'
      },
      tooltip: {},
      legend: {
        data: ['Sales']
      },
      xAxis: {
        data: ["shirt", "cardign", "chiffon shirt", "pants", "heels", "socks"]
      },
      yAxis: {},
      series: [{
        name: 'Sales',
        type: 'line',  // Specify chart type
        data: [5, 20, 36, 10, 10, 20]
      }]
    };
    return(
      <ReactECharts option={option} style={{height:"100px",with:"100px"}} className='bg-slate-200	w-80 h-80' />
    )
  }
}

export default MyComponent;