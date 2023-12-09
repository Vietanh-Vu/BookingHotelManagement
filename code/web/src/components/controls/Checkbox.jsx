import * as React from 'react'
import {FormControl, FormControlLabel, Checkbox} from '@mui/material'

function CheckBox(props) {
  const {name, label, value, onChange, ...other} = props

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  })

  return (
    <FormControl {...other}>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            color="primary"
            checked={value}
            onChange={e =>
              onChange(convertToDefEventPara(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  )
}

export default CheckBox
