import {useState, useEffect} from 'react'
import {Box, Typography, Button} from '@mui/material'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import Select from './SelectCom.jsx'
import Input from './Input.jsx'
import CheckBox from './CheckBox.jsx'

function Add(props) {
  const [category, setCategory] = useState({})
  const [hotelName, setHotelName] = useState('')
  const [address, setAdress] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/hotel/add`)
      .then(res => {
        setCategories(res.data)
        console.log(categories)
      })
      .catch(error => console.log(error))
  }, [])

  const postData = () => {
    axios
      .post('http://localhost:3000/admin/hotel/add', {
        CategoryId: category.CategoryId,
        HotelName: hotelName,
        IsActive: isActive,
        Address: address,
        Description: description,
        HotelImg: 'Vietannguvl'
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleChange1 = (event, setValue) => {
    setValue(categories[event.target.value])
  }

  const handleChange = (event, setValue) => {
    setValue(event.target.value)
  }

  const handleChecked = (event, setValue) => {
    console.log(isActive)
    setValue(event.target.checked)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    postData()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            width: '100wh',
            maxWidth: '50%',
            marginTop: '70px',
          }}
          noValidate
          autoComplete="off">
          <Select
            items={categories}
            handleChange={handleChange1}
            item={category}
            setItem={setCategory}
          />
          <Input
            name="HotelName"
            handleChange={handleChange}
            item={hotelName}
            setItem={setHotelName}
            label="Hotel name"
          />
          <Input
            name="Address"
            handleChange={handleChange}
            item={address}
            setItem={setAdress}
            label="Address"
          />
          <Input
            name="Description"
            handleChange={handleChange}
            item={description}
            setItem={setDescription}
            label="Description"
          />
          <CheckBox
            label="Is active ?"
            checked={isActive}
            setChecked={setIsActive}
            handleChange={handleChecked}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{marginTop: '20px', marginLeft: '20px'}}>
            Add hotel
          </Button>
        </Box>
      </form>
    </>
  )
}

export default Add
