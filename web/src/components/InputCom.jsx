import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'

function InputCom(props) {
  const handleChange = event => {
    props.setItem(event.target.value)
  }

  return (
    <FormControl fullWidth sx={{marginTop: '20px', marginLeft: '20px'}}>
      <TextField
      required
        id={props.name}
        label={props.label}
        onChange={handleChange}
        value={props.item}
        variant="outlined"
      />
    </FormControl>
  )
}

export default InputCom;
