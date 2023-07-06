import {AppBar, Toolbar, Typography, Tabs, Tab, Button} from '@mui/material'
import HotelIcon from '@mui/icons-material/Hotel'
import {Link, useNavigate} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import {styled, alpha} from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { logOut } from '../redux/apiRequest/loginApi'
import { createAxios } from '../createInstance'

function NavBar(props) {
  const [value, setValue] = useState(props.value)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.login.currentUser)
  let axiosJWT = createAxios(user, dispatch, navigate);

  // const Search = styled('div')(({theme}) => ({
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   marginRight: theme.spacing(2),
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(3),
  //     width: 'auto',
  //   },
  // }))

  // const SearchIconWrapper = styled('div')(({theme}) => ({
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }))

  // const StyledInputBase = styled(InputBase)(({theme}) => ({
  //   color: 'inherit',
  //   '& .MuiInputBase-input': {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     // vertical padding + font size from searchIcon
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create('width'),
  //     width: '100%',
  //     [theme.breakpoints.up('md')]: {
  //       width: '20ch',
  //     },
  //   },
  // }))

  const handleLogOut = () => {
    logOut(dispatch, navigate, user?.accessToken, user?.refreshToken, axiosJWT);
  }

  return (
    <AppBar sx={{background: '#063970'}}>
      <Toolbar>
        <HotelIcon />
        <Tabs
          value={value}
          onChange={(event, value) => {
            setValue(value)
          }}
          sx={{marginLeft: '10px'}}
          textColor="inherit">
          {user?.accessToken ? props.pages.map(({page, path}, index) => (
            <Tab key={index} label={page} component={Link} to={path} />
          )): <Tab key={0} label={'Home'} component={Link} to={'/admin'} />}
        </Tabs>
        {/* {props.page ? (
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
        )} */}
        {user?.accessToken ? (
          <>
            <Typography
              sx={{
                marginLeft: 'auto',
              }}
              variant="contained">
              {`Hi, ${user.returnData.FirstName} ${user.returnData.LastName}`}
            </Typography>
            <Button
              sx={{marginLeft: '10px'}}
              variant="contained"
              onClick={handleLogOut}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{marginLeft: 'auto'}}
              variant="contained"
              onClick={() => navigate(`/admin/login`)}>
              Login
            </Button>
            <Button
              sx={{marginLeft: '10px'}}
              variant="contained"
              onClick={() => navigate(`/admin/register`)}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
