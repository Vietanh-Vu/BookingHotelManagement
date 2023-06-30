import React, {useState, useEffect} from 'react'
import {Grid, Button, TextField, InputAdornment} from '@mui/material'
import Controls from '../../components/controls/Controls'
import {useForm, Form} from '../../components/useForm'
import axios from 'axios'

const initialFValues = {
  RoomId: '',
  RoomName: '',
  IsActive: false,
  CurrentPrice: '',
  Description: '',
  IsAvailable: false,
  RoomTypeId: '',
}

export default function RoomsForm(props) {
  const {addOrEdit, recordForEdit} = props

  const {values, setValues, errors, setErrors, handleInputChange, resetForm} =
    useForm(initialFValues)

  const [roomTypes, setRoomTypes] = useState([{}])

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/hotel/rooms`)
      .then(res => {
        setRoomTypes(
          res.data.map(roomType => ({
            ...roomType,
            title: roomType.RoomTypeName,
            id: roomType.RoomTypeId,
          })),
        )
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (recordForEdit != null) setValues(recordForEdit)
  }, [recordForEdit])

  const handleSubmit = e => {
    e.preventDefault()
    addOrEdit(values, resetForm)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="RoomName"
            label="Room Name"
            value={values.RoomName}
            onChange={handleInputChange}
            error={errors.RoomName}
          />
          <Controls.Input
            label="Current Price"
            name="CurrentPrice"
            value={values.CurrentPrice}
            onChange={handleInputChange}
            error={errors.CurrentPrice}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            required
            variant="outlined"
            label="Description"
            name="Description"
            multiline
            onChange={handleInputChange}
            value={values.Description}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            name="RoomTypeId"
            label="Room Type"
            value={values.RoomTypeId}
            onChange={handleInputChange}
            options={roomTypes}
          />
          <Controls.Checkbox
            name="IsAvailable"
            label="Available"
            value={values.IsAvailable}
            onChange={handleInputChange}
          />
          <Controls.Checkbox
            name="IsActive"
            label="Active"
            value={values.IsActive}
            onChange={handleInputChange}
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
