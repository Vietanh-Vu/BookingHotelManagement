import * as React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Hotels from './pages/Hotels.jsx'
import Users from './pages/Users.jsx'
import AddHotel from './pages/AddHotel.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin">
          <Route index element={<Home />} />
          <Route path="showhotels/" element={<Hotels />} />
          <Route path="showusers" element={<Users />} />
          <Route path="addhotel" element={<AddHotel />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
