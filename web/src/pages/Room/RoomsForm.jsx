import React, {useState, useEffect} from 'react'
import {Grid, Button, TextField} from '@mui/material'
import Controls from '../../components/controls/Controls'
import {useForm, Form} from '../../components/useForm'
import axios from 'axios'

const initialFValues = {
  RoomId: '',
  RoomName: '',
  IsActive: false,
  CurrentPrice: 0,
  Description: '',
  IsAvailable: false,
  RoomTypeId: '',
}

export default function RoomsForm(props) {
  const {addOrEdit, recordForEdit} = props

  const {values, setValues, errors, setErrors, handleInputChange, resetForm} =
    useForm(initialFValues)

  const [categories, setCategories] = useState([{}])

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/hotel/add`)
      .then(res => {
        setCategories(
          res.data.map(category => ({
            ...category,
            title: category.CategoryName,
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
        <Grid item xs={4}>
          <Controls.Input
            name="HotelName"
            label="Hotel Name"
            value={values.HotelName}
            onChange={handleInputChange}
            error={errors.HotelName}
          />
          <Controls.Input
            label="Address"
            name="Address"
            value={values.Address}
            onChange={handleInputChange}
            error={errors.Address}
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
        <Grid item xs={4}>
          {values.ImgSelected ? (
            <div>
              <img
                alt="not found"
                width={'350px'}
                src={URL.createObjectURL(values.ImgSelected)}
              />
              <Controls.Button
                text="Remove"
                onClick={() => {
                  setValues({
                    ...values,
                    ImgSelected: null,
                  })
                }}
              />
            </div>
          ) : (
            values.HotelImg && (
              <div>
                <img
                  alt="not found"
                  width={'350px'}
                  src={require(`../../../../img/${values.HotelImg}`).default}
                />
                <Controls.Button
                  text="Remove"
                  onClick={() => {
                    setValues({
                      ...values,
                      ImgSelected: null,
                    })
                  }}
                />
              </div>
            )
          )}
          {!values.ImgSelected && !values.HotelImg && (
            <Button
              sx={{marginTop: '10px'}}
              variant="contained"
              component="label">
              Upload Photo
              <input
                required={true}
                accept="image/jpg"
                type="file"
                name="myImage"
                onChange={event => {
                  setValues({...values, ImgSelected: event.target.files[0]})
                }}
                hidden
              />
            </Button>
          )}
        </Grid>
        <Grid item xs={4}>
          <Controls.Select
            name="CategoryId"
            label="Category"
            value={values.CategoryId}
            onChange={handleInputChange}
            options={categories}
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
