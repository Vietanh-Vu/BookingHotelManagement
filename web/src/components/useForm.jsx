import React, {useState} from 'react'
import {makeStyles} from '@mui/styles'

export function useForm(initialFValues) {
  const [values, setValues] = useState(initialFValues)
  const [errors, setErrors] = useState({})

  const handleInputChange = e => {
    const {name, value} = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const resetForm = () => {
    setValues(initialFValues)
    setErrors({})
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: '4px',
    },
  },
}))

export function Form(props) {
  const classes = useStyles()
  const {children, ...other} = props
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  )
}
