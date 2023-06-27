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
    <FormControl required variant="outlined" {...other}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        name={name}
        value={value}
        label={label}
        onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {options.map(item => (
          <MenuItem key={item.CategoryId} value={item.CategoryId}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export default Select
