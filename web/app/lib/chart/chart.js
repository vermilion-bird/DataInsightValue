
// 饼状图
export function genPie(data, dimension, metric) {
    const rows = data.rows;
    const headers = data.headers
    let dim_index = headers.indexOf(dimension)
    let metric_index = headers.indexOf(metric)
    const pieData = rows.map(row => ({
        value: parseFloat(row[metric_index]), // budget
        name: row[dim_index] // name
    }));
    return {
        // title: {
        //     text: 'Referer of a Website',
        //     subtext: 'Fake Data',
        //     left: 'center'
        // },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: pieData.map(item => item.name)
        },
        series: [
            {
                // name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: pieData,
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
}


//线形堆叠
export function genStackedLine(data, dimension, metrics) {
    const rows = data.rows;
    const headers = data.headers;
    let dim_index = headers.indexOf(dimension);
    let metric_indices = metrics.map(metric => headers.indexOf(metric));

    const seriesData = metrics.map((metric, index) => ({
        name: metric,
        type: 'line',
        stack: 'Total',
        data: rows.map(row => parseFloat(row[metric_indices[index]]))
    }));

    return {
        // title: {
        //     text: 'Stacked Line'
        // },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: metrics
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
            data: rows.map(row => row[dim_index])
        },
        yAxis: {
            type: 'value'
        },
        series: seriesData
    };
}


//柱状图
export function genBar(data, dimension, metric) {
    const rows = data.rows;
    const headers = data.headers;
    let dim_index = headers.indexOf(dimension);
    let metric_index = headers.indexOf(metric);
    
    const seriesData = {
        data: rows.map(row => parseFloat(row[metric_index])),
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
        }
    };

    return {
        xAxis: {
            type: 'category',
            data: rows.map(row => row[dim_index])
        },
        yAxis: {
            type: 'value'
        },
        series: [seriesData]
    };
}
