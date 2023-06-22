import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'

function Input(props) {
  const handleChange = event => {
    props.handleChange(event, props.setItem)
  }

  return (
    <FormControl fullWidth sx={{marginTop: '20px', marginLeft: '20px'}}>
      <TextField
        id={props.name}
        label={props.label}
        onChange={handleChange}
        value={props.item}
        variant="outlined"
      />
    </FormControl>
  )
}

export default Input
