import React from 'react'
import {Button} from '@mui/material'
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 0,
    margin: '3px',
  },
  secondary: {
    backgroundColor: '#f8324526',
    '& .MuiButton-label': {
      color: "#f83245",
    },
  },
  primary: {
    backgroundColor: '#3c44b126',
    '& .MuiButton-label': {
      color: "#333996",
    },
  },
}))

export default function ActionButton(props) {
  const {color, children, onClick} = props
  const classes = useStyles()

  return (
    <Button className={`${classes.root} ${classes[color]}`} onClick={onClick}>
      {children}
    </Button>
  )
}
