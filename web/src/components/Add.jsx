import {useState} from 'react'
import {Box, Typography} from '@mui/material'
import TextField from '@mui/material/TextField'
import Select from './SelectCom.jsx'

function Add(props) {
  const [category, setCategory] = useState('');
  const categories = ['Luxury', 'Boutique', 'Budget', 'Resort', 'Extended Stay'];
  const handleChange = event => {
    setCategory(event.target.value);
    console.log(category);
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {m: 1, width: '25ch'},
          marginTop: '70px',
        }}
        noValidate
        autoComplete="off">
        <Select categories={categories} handleChange={handleChange} category={category}/>
        <TextField id="outlined-basic" label="Hotel name" variant="outlined" />
      </Box>
    </>
  )
}

export default Add
