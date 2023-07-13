import React from 'react'
import {Card, CardContent, CardHeader} from '@mui/material'
import {alpha, useTheme} from '@mui/material/styles'
import {Chart} from '../chart'

const useChartOptions = months => {
  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: ['#3f51b5', alpha('#3f51b5', 0.25)],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: 'solid',
    },
    grid: {
      borderColor: '#F2F4F7',
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '40px',
      },
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2,
    },
    theme: {
      mode: 'light',
    },
    xaxis: {
      axisBorder: {
        color: '#F2F4F7',
        show: true,
      },
      axisTicks: {
        color: '#F2F4F7',
        show: true,
      },
      categories: months
        ? months
        : [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
      labels: {
        offsetY: 5,
        style: {
          //   colors: neutral[500],
        },
      },
    },
    yaxis: {
      labels: {
        formatter: value => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          //   colors: neutral[500],
        },
      },
    },
  }
}

export const ColumnChart = props => {
  const {chartSeries, sx, months, years, label} = props

  function matchMonthYear(month, year) {
    return `${month}/${year}`
  }

  const chartOptions = useChartOptions(
    months?.map((month, index) => matchMonthYear(month, years.at(index))),
  )

  return (
    <Card sx={sx}>
      <CardHeader title={label} />
      <CardContent>
        <React.Suspense fallback={null}>
          <Chart
            height={350}
            options={chartOptions}
            series={chartSeries}
            type="bar"
            width="100%"
          />
        </React.Suspense>
      </CardContent>
    </Card>
  )
}
