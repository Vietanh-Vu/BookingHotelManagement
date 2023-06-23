import NavBar from '../components/NavBar.jsx'
import {pages} from './Var.jsx'
import HotelList from '../components/HotelList.jsx'

function Hotels() {
  return (
    <>
      <NavBar page="Hotels" pages={pages} value={1} />
      <HotelList />
    </>
  )
}

export default Hotels
