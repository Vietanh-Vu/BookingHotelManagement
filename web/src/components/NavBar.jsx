import {AppBar, Toolbar, Typography, Tabs, Tab, Button} from '@mui/material'
import HotelIcon from '@mui/icons-material/Hotel'
import {Link} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import {styled, alpha} from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import {useState} from 'react'

function NavBar(props) {
  const [value, setValue] = useState(0)

  const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }))

  const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }))

  const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }))

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <AppBar sx={{background: '#063970'}}>
      <Toolbar>
        <HotelIcon />
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{marginLeft: '10px'}}
          textColor="inherit">
          {props.pages.map(({page, path}, index) => (
              <Tab key={index} label={page} component={Link} to={path} />
            ))}
        </Tabs>
        {props.page ? (
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={
                props.page.substring(0, props.page.length - 1) + ' name'
              }
              inputProps={{'aria-label': 'search'}}
            />
          </Search>
        ) : (
          <></>
        )}
        <Button sx={{marginLeft: 'auto'}} variant="contained">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
