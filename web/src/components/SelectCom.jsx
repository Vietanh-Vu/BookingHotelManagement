import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function SelectCom(props) {
  const handleChange = event => {
    props.setItem(event.target.value)
  }

  return (
    <FormControl
      required
      fullWidth
      sx={{marginTop: '20px', marginLeft: '20px'}}>
      <InputLabel id="select-label">Category</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={props.item.CategoryName}
        label="Category"
        onChange={handleChange}>
        {props.items.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item.CategoryName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectCom
