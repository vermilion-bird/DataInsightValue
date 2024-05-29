## 1. 折线图

####  1.1 定制化字段

​           legend => data: ['Impressions', 'Clicks', 'Conversions', 'Cost']

​		    xAxis   =>  data: ['2022-02-04', '2022-02-04', '2022-04-04', '2022-04-04', '2022-06-04', '2022-06-04', '2022-08-04', '2022-08-04', '2022-12-04', '2022-12-04']

​		    yAxis => series =>  data [1500, 1200, 1000]

```
option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Impressions', 'Clicks', 'Conversions', 'Cost']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2022-02-04', '2022-02-04', '2022-04-04', '2022-04-04', '2022-06-04', '2022-06-04', '2022-08-04', '2022-08-04', '2022-12-04', '2022-12-04']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Impressions',
            type: 'line',
            stack: 'Total',
            data: [1500, 1200, 1000, 800, 2500, 2000, 1800, 1500, 1200, 1000]
          },
          {
            name: 'Clicks',
            type: 'line',
            stack: 'Total',
            data: [300, 250, 200, 150, 500, 400, 360, 300, 240, 200]
          },
          {
            name: 'Conversions',
            type: 'line',
            stack: 'Total',
            data: [20, 15, 10, 5, 50, 30, 25, 20, 15, 10]
          },
          {
            name: 'Cost',
            type: 'line',
            stack: 'Total',
            data: [45.0, 35.0, 15.0, 10.0, 100.0, 80.0, 75.0, 60.0, 45.0, 40.0]
          }
        ]
      }
```

## 2. 饼状图

### 	2.1 字段定制

​	series => data[{ value: 1048, name: 'Search Engine' }]

```
option = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
```

### 3. 面积图

```
option = {
  title: {
    text: 'Stacked Area Chart'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};
```

