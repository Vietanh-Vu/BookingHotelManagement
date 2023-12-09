import * as React from 'react'
import {Routes, Route} from 'react-router-dom'
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from '@mui/styles'
import Home from './pages/Home.jsx'
import Hotels from './pages/Hotel/Hotels.jsx'
import Users from './pages/User/Users.jsx'
import Rooms from './pages/Room/Rooms.jsx'
import SignIn from './pages/Login/SignIn.jsx'
import Register from './pages/Login/Register.jsx'
import RoomReservationHistory from './pages/Room/RoomReservationHistory.jsx'
import UserReservationHistory from './pages/User/UserReservationHistory.jsx'

const useStyles = makeStyles({
  appMain: {
    width: '100%',
  },
})

function App() {
  const classes = useStyles()

  return (
    <div className={classes.appMain}>
      <Routes>
        <Route path="/admin">
          <Route index element={<Home />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="hotels/rooms/:hotelId/:hotelName" element={<Rooms />} />
          <Route path="users" element={<Users />} />
          <Route path='login' element={<SignIn />} />
          <Route path='register' element={<Register />} />
          <Route path="hotels/rooms/:hotelId/:hotelName/:roomId/:roomName" element={<RoomReservationHistory />} />
          <Route path="users/:userId/:userName" element={<UserReservationHistory />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
