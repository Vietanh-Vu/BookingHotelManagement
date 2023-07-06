import React, {useState, useEffect} from 'react'
import {Grid, Button, TextField} from '@mui/material'
import Controls from '../../components/controls/Controls'
import {useForm, Form} from '../../components/useForm'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getCategories} from '../../redux/apiRequest/hotelApi'
import {createAxios} from '../../createInstance'

const initialFValues = {
  HotelId: '',
  HotelName: '',
  IsActive: false,
  Address: '',
  Description: '',
  ImgSelected: null,
  CategoryId: '',
}

export default function HotelsForm(props) {
  const {addOrEdit, recordForEdit} = props

  const {values, setValues, errors, setErrors, handleInputChange, resetForm} =
    useForm(initialFValues)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.login?.currentUser)
  const categories = useSelector(
    state => state.hotels.categories?.allCategories,
  )
  let axiosJWT = createAxios(user, dispatch, navigate)

  useEffect(() => {
    if (!user) {
      navigate('/admin/login')
    }
    getCategories(user?.accessToken, dispatch, axiosJWT)
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
