import {useState, useEffect} from 'react'
import {Box, Typography, Button, Input} from '@mui/material'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import FormData from 'form-data'
import Select from './SelectCom.jsx'
import InputCom from './InputCom.jsx'
import CheckBox from './CheckBox.jsx'
import { dirPath } from '../pages/Var.jsx'

function Add(props) {
  const [category, setCategory] = useState({})
  const [hotelName, setHotelName] = useState('')
  const [address, setAdress] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [categories, setCategories] = useState([{}, {}])
  const [selectedImage, setSelectedImage] = useState(null)
  const [hotelImg, setHotelImg] = useState('')

  const postImage = () => {
    const formData = new FormData()
    formData.append('myImage', selectedImage)
    axios
      .post(`http://localhost:3000/admin/hotel/add/image`, formData)
      .then(response => {
        console.log(dirPath + response.data.nameFile)
        setHotelImg(dirPath + response.data.nameFile)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const postData = () => {
    const hotelData = {
      CategoryId: category.CategoryId,
      HotelName: hotelName,
      IsActive: isActive,
      Address: address,
      Description: description,
      HotelImg: hotelImg,
    }
    axios
      .post('http://localhost:3000/admin/hotel/add', hotelData)
      .then(response => {
        alert(response.data.message)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleSubmit = async event => {
    postImage();
    event.preventDefault()
    postData();
    setCategory({})
    setHotelName('')
    setAdress('')
    setDescription('')
    setIsActive(false)
    setSelectedImage(null)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{width: '100wh', maxWidth: '50%', marginTop: '70px'}}>
      <Select items={categories} item={category} setItem={setCategory} />
      <InputCom
        name="HotelName"
        item={hotelName}
        setItem={setHotelName}
        label="Hotel name"
      />
      <InputCom
        name="Address"
        item={address}
        setItem={setAdress}
        label="Address"
      />
      <TextField
        fullWidth
        required
        sx={{marginTop: '20px', marginLeft: '20px'}}
        id="Description"
        label="Description"
        placeholder="Description"
        multiline
        onChange={e => setDescription(e.target.value)}
        value={description}
      />
      <CheckBox
        label="Is active ?"
        checked={isActive}
        setChecked={setIsActive}
      />
      {selectedImage && (
        <div style={{marginTop: '20px', marginLeft: '20px'}}>
          <img
            alt="not found"
            width={'800px'}
            src={URL.createObjectURL(selectedImage)}
          />
          <Button
            sx={{marginTop: '20px'}}
            variant="contained"
            onClick={() => setSelectedImage(null)}>
            Remove
          </Button>
        </div>
      )}
      <Button
        fullWidth
        sx={{marginTop: '20px', marginLeft: '20px'}}
        variant="contained"
        component="label">
        Upload Photo
        <input
          required={true}
          accept="image/jpg"
          type="file"
          name="myImage"
          onChange={event => {
            setSelectedImage(event.target.files[0])
          }}
          hidden
        />
      </Button>
      <Button
        type="submit"
        variant="contained"
        sx={{marginTop: '20px', marginLeft: '20px'}}>
        Add hotel
      </Button>
    </form>
  )
}

export default Add
