import React, {useState, useEffect} from 'react'
import {Grid, Button, TextField} from '@mui/material'
import Controls from '../../components/controls/Controls'
import {useForm, Form} from '../../components/useForm'
import axios from 'axios'

const initialFValues = {
  category: {},
  hotelName: '',
  isActive: false,
  address: '',
  description: '',
  hotelImg: null,
}

export default function HotelsForm(props) {
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

  const postData = () => {
    const formData = new FormData()
    formData.append('myImage', values.hotelImg)
    axios
      .post(`http://localhost:3000/admin/hotel/add/image`, formData)
      .then(response => {
        const hotelData = {
          CategoryId: values.category.CategoryId,
          HotelName: values.hotelName,
          IsActive: values.isActive ? true : false,
          Address: values.address,
          Description: values.description,
          HotelImg: response.data.nameFile,
        }
        axios
          .post('http://localhost:3000/admin/hotel/add', hotelData)
          .then(response => {
            alert(response.data.message)
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleSubmit = e => {
    e.preventDefault()
    postData()
    resetForm()
  }

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      })
  }, [recordForEdit])

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={4}>
          <Controls.Input
            name="hotelName"
            label="Hotel Name"
            value={values.hotelName}
            onChange={handleInputChange}
            error={errors.hotelName}
          />
          <Controls.Input
            label="Address"
            name="address"
            value={values.address}
            onChange={handleInputChange}
            error={errors.address}
          />
          <TextField
            required
            variant="outlined"
            label="Description"
            name="description"
            multiline
            onChange={handleInputChange}
            value={values.description}
          />
          <Controls.Input
            label="City"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          {values.hotelImg && (
            <div>
              <img
                alt="not found"
                width={'230px'}
                src={URL.createObjectURL(values.hotelImg)}
              />
              <Controls.Button
                text="Remove"
                onClick={() => {
                  setValues({
                    ...values,
                    hotelImg: null,
                  })
                }}
              />
            </div>
          )}
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
                setValues({...values, hotelImg: event.target.files[0]})
              }}
              hidden
            />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Controls.Select
            name="category"
            label="Category"
            value={values.category}
            onChange={handleInputChange}
            options={categories}
          />
          <Controls.Checkbox
            name="isActive"
            label="Active"
            value={values.isActive}
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
