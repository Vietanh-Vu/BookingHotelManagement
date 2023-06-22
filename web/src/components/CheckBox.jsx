import * as React from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import {FormControl} from '@mui/material'

function CheckBox(props) {
  const handleChange = event => {
    props.handleChange(event, props.setChecked)
  }

  return (
    <FormControl fullWidth sx={{marginTop: '20px', marginLeft: '20px'}}>
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            checked={props.checked}
            onChange={handleChange}
          />
        }
        label={props.label}
      />
    </FormControl>
  )
}

export default CheckBox
