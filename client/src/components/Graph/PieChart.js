import React, { useContext } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import { MonitorContext } from '../../contexts/MonitorContext'

const PieChart = () => {
  const { monitors } = useContext(MonitorContext)

  if (monitors && monitors.length > 0) {
    monitors.forEach((monitor) => {
      console.dir(monitor)
    })
  }

  // Make monochrome colors
  const pieColors = (() => {
    var colors = [],
      base = '#805AD5',
      i

    for (i = 0; i < 10; i += 1) {
      // Start out with a darkened base color (negative brighten), and end
      // up with a much brighter color
      colors.push(
        Highcharts.color(base)
          .brighten((i - 3) / 7)
          .get()
      )
    }
    return colors
  })()

  let options = {
    chart: {
      type: 'pie',
      backgroundColor: null,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      style: {
        color: 'white',
      },
    },
    title: {
      text: 'Monitor Status',
      style: {
        color: 'white',
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        colors: pieColors,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
          distance: -50,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4,
          },
        },
      },
    },
    series: [
      {
        name: 'Count',
        data: [
          { name: 'Up', y: 6 },
          { name: 'Down', y: 1 },
          { name: 'Disabled', y: 1 },
        ],
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
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'chart'}
      options={options}
      allowChartUpdate={true}
    />
  )
}

export default PieChart
