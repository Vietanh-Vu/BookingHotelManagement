import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function SelectCom(props) {
  return (
    <Box sx={{minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="select-label">Category</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={props.category}
          label="Category"
          onChange={props.handleChange}>
          {props.categories.map(category => (
            <MenuItem>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectCom;
