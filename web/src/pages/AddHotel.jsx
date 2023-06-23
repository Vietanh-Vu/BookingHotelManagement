import NavBar from '../components/NavBar.jsx'
import {pages} from './Var.jsx'
import Add from '../components/Add.jsx'

function Hotels() {
  return (
    <>
      <NavBar page="Hotels" pages={pages} value={2} />
      <Add />
    </>
  )
}

export default Hotels
