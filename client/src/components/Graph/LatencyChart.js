import React, { useContext } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment-timezone'

import { MonitorContext } from '../../contexts/MonitorContext'

const LatencyChart = (monitor) => {
  const { monitors } = useContext(MonitorContext)
  const thisMonitor = monitors.filter((el) => {
    return el._id === monitor.monitor._id
  })[0]
  const data = thisMonitor.heartbeats

  let dataArray = []
  let dateArray = []
  if (data && data.length > 0) {
    data.forEach((val) => {
      dataArray.unshift(val.responseTime)
      let ts = moment(val.createdAt).format('MMM Do, h:mm a')
      dateArray.unshift(ts)
    })

    console.log(dataArray)
    console.log(dateArray)
  }

  let options = {
    chart: {
      type: 'areaspline',
      backgroundColor: null,
      height: 250,
      style: {
        color: 'white',
      },
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: dateArray,
      labels: {
        style: {
          color: 'white',
          font: '11px Trebuchet MS, Verdana, sans-serif',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Milliseconds',
        style: {
          color: 'white',
        },
      },
      labels: {
        style: {
          color: 'white',
          font: '11px Trebuchet MS, Verdana, sans-serif',
        },
      },
      plotBands: [
        {
          // visualize high latency requests
          from: 1000,
          to: 1499,
          color: 'rgba(247, 160, 0, .1)',
        },
        {
          // visualize high latency requests
          from: 1500,
          to: 999999,
          color: 'rgba(255, 0, 0, .1)',
        },
      ],
      // plotLines: [
      //   {
      //     label: {
      //       text: 'Avg. Response Time',
      //       align: 'left',

      //       style: {
      //         color: 'white',
      //         paddingLeft: '10px',
      //       },
      //     },
      //     color: 'grey',
      //     width: 1,
      //     value: 928.5,
      //   },
      // ],
    },
    tooltip: {
      shared: true,
      valueSuffix: ' ms',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.2,
      },
      series: {
        color: '#6B46C1',
        dataLabels: {
          enabled: true,
          color: 'grey',
          style: {
            textOutline: false,
          },
        },
      },
    },
    series: [
      {
        name: 'Response Time',
        data: dataArray,
      },
    ],
    rangeSelector: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  )
}

export default LatencyChart