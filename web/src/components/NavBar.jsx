import {AppBar, Toolbar, Typography, Tabs, Tab, Button} from '@mui/material'
import HotelIcon from '@mui/icons-material/Hotel'
import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {logOut} from '../redux/apiRequest/loginApi'
import {createAxios} from '../createInstance'
import Popup from './Popup'
import {settingUser} from '../redux/apiRequest/userApi'
import UsersForm from '../pages/User/UsersForm'

function NavBar(props) {
  const [value, setValue] = useState(props.value)
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.login.currentUser)
  let axiosJWT = createAxios(user, dispatch, navigate)

  const handleLogOut = async () => {
    await logOut(dispatch, navigate, user?.accessToken, user?.refreshToken, axiosJWT)
  }

  const edit = async (item, resetForm) => {
    const resMsg = await settingUser(
      user?.accessToken,
      dispatch,
      axiosJWT,
      item,
      user.returnData.UsersId,
      user.returnData.Email,
    )
    alert(resMsg)
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
    if (item.Email != user.returnData.Email) navigate('/admin/login')
  }

  const openInPopup = item => {
    console.log(item)
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  return (
    <>
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
            {user?.accessToken ? (
              props.pages.map(({page, path}, index) => (
                <Tab key={index} label={page} component={Link} to={path} />
              ))
            ) : (
              <Tab key={0} label={'Home'} component={Link} to={'/admin'} />
            )}
          </Tabs>
          {user?.accessToken ? (
            <>
              <Button
                sx={{marginLeft: 'auto'}}
                variant="contained"
                onClick={() => openInPopup(user.returnData)}>
                Hi, {user.returnData.FirstName} {user.returnData.LastName}
              </Button>
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
      <Popup
        title="User form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
        <UsersForm recordForEdit={recordForEdit} edit={edit} />
      </Popup>
    </>
  )
}

export default NavBar
