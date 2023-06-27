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
import Users from './pages/Users.jsx'

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
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
