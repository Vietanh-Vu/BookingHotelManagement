import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material'
import {Chart} from '../chart.jsx'
import React from 'react';

const useChartOptions = labels => {
  return {
    chart: {
      background: 'transparent',
    },
    colors: ['#FF6900', '#F47373', '#697689', '#37D67A', '#2CCCE4'],
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: 'light',
    },
    tooltip: {
      fillSeriesColor: false,
    },
  }
}

export const Circle = props => {
  const {chartSeries, labels, sx} = props
  const chartOptions = useChartOptions(labels)

  return (
    <Card sx={sx}>
      <CardHeader title="Category Revenue" />
      <CardContent>
        <React.Suspense fallback={null}>
          <Chart
            height={300}
            options={chartOptions}
            series={chartSeries}
            type="donut"
            width="100%"
          />
        </React.Suspense>
        <Stack
          alignItems="center"
          direction="column"
          justifyContent="left"
          spacing={2}
          sx={{mt: 2}}>
          {chartSeries.map((item, index) => {
            const label = labels[index]

            return (
              <Box
                key={label}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Typography sx={{my: 1}} variant="span">
                  {label}
                </Typography>
                <Typography color="text.secondary" variant="span">
                  : {item}%
                </Typography>
              </Box>
            )
          })}
        </Stack>
      </CardContent>
    </Card>
  )
}
