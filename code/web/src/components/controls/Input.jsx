import TextField from '@mui/material/TextField'

function Input(props) {

  const { name, label, value, onChange, ...other } = props;

  const handleChange = event => {
    props.setItem(event.target.value)
  }

  return (
      <TextField
        required
        variant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...other}
      />
  )
}

export default Input