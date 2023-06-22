import {useState} from 'react'
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
  const categories = [
    {
      ID: 1,
      CategoryId: 'CA01',
      CategoryName: 'Luxury',
    },
    {
      ID: 2,
      CategoryId: 'CA02',
      CategoryName: 'Boutique',
    },
    {
      ID: 3,
      CategoryId: 'CA03',
      CategoryName: 'Budget',
    },
    {
      ID: 4,
      CategoryId: 'CA04',
      CategoryName: 'Resort',
    },
    {
      ID: 5,
      CategoryId: 'CA05',
      CategoryName: 'Extended Stay',
    },
  ]

  const handleChange = (event, setValue) => {
    console.log(category.CategoryName)
    setValue(event.target.value)
  }

  const handleChecked = (event, setValue) => {
    console.log(isActive)
    setValue(event.target.checked)
  }

  const handleSubmit = () => {}

  // axios.get(`https://localhost:3000/`)
  //     .then(res => {
  //       const persons = res.data;
  //       this.setState({ persons });
  //     })
  //     .catch(error => console.log(error));

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
            handleChange={handleChange}
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
