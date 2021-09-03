import React, { useContext } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import { MonitorContext } from '../../contexts/MonitorContext'

const GetData = (monitor) => {
  const { monitors } = useContext(MonitorContext)
  const thisMonitor = monitors.filter(function (el) {
    return el._id === monitor.monitor._id
  })[0]
  const data = thisMonitor.heartbeats
}

const options = {
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
    categories: ['3:53p', '3:54p', '3:55p', '3:56p', '3:57p', '3:58p', '3:59p'],
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
        from: 1500,
        to: 999999,
        color: 'rgba(247, 160, 0, .1)',
      },
    ],
    plotLines: [
      {
        label: {
          text: 'Avg. Response Time',
          align: 'left',

          style: {
            color: 'white',
            paddingLeft: '10px',
          },
        },
        color: 'grey',
        width: 1,
        value: 928.5,
      },
    ],
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
    },
  },
  series: [
    {
      name: 'Response Time',
      data: [849, 1416, 1426, 839, 1488, 859, 1461],
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

const LatencyChart = () => (
  <HighchartsReact
    highcharts={Highcharts}
    constructorType={'stockChart'}
    options={options}
  />
)

export default LatencyChart
