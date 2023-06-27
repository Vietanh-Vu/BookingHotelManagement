import * as React from 'react'
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from '@mui/material'

function Select(props) {
  const {name, label, value, onChange, options, ...other} = props

  return (
    <FormControl variant="outlined" {...other}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        required
        name={name}
        value={value}
        label={label}
        onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {options.map(item => (
          <MenuItem key={item.ID} value={item}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export default Select
