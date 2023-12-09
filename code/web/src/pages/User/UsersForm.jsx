import React, {useState, useEffect} from 'react'
import {Grid, Button, TextField, InputAdornment} from '@mui/material'
import Controls from '../../components/controls/Controls'
import {useForm, Form} from '../../components/useForm'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {createAxios} from '../../createInstance'
import {getRoomTypes} from '../../redux/apiRequest/roomApi'

const initialFValues = {
  UsersId: '',
  FirstName: '',
  LastName: '',
  Email: '',
  Phone: '',
  Address: '',
  Password: '',
  RePassword: '',
}

export default function UsersForm(props) {
  const {edit, recordForEdit} = props

  const {values, setValues, errors, setErrors, handleInputChange, resetForm} =
    useForm(initialFValues)

  const navigate = useNavigate()
  const user = useSelector(state => state.auth.login?.currentUser)

  useEffect(() => {
    if (!user) {
      navigate('/admin/login')
    }
  }, [])

  useEffect(() => {
    if (recordForEdit != null) setValues(recordForEdit)
  }, [recordForEdit])

  const handleSubmit = e => {
    e.preventDefault()
    if (values.RePassword == values.Password)
      edit(values, resetForm)
    else alert('Confirm Password incorrect')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="FirstName"
            label="First Name"
            value={values.FirstName}
            onChange={handleInputChange}
            error={errors.FirstName}
          />
          <Controls.Input
            label="Last Name"
            name="LastName"
            value={values.LastName}
            onChange={handleInputChange}
            error={errors.LastName}
          />
          <Controls.Input
            label="Email"
            name="Email"
            value={values.Email}
            onChange={handleInputChange}
            error={errors.Email}
          />
          <Controls.Input
            label="Phone"
            name="Phone"
            value={values.Phone}
            onChange={handleInputChange}
            error={errors.Phone}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Address"
            name="Address"
            value={values.Address}
            onChange={handleInputChange}
            error={errors.Address}
          />
          <Controls.Input
            label="Password"
            name="Password"
            value={values.Password}
            onChange={handleInputChange}
            error={errors.Password}
            type="password"
          />
          <Controls.Input
            label="Confirm Password"
            name="RePassword"
            value={values.RePassword}
            onChange={handleInputChange}
            error={errors.RePassword}
            type="password"
          />
          <div>
            <Controls.Button text="Reset" onClick={resetForm} />
            <Controls.Button
              type="submit"
              text="Submit"
              sx={{marginLeft: '10px'}}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  )
}
