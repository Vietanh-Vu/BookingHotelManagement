import NavBar from '../components/NavBar.jsx'
import {pages} from './Var.jsx'

function Users() {
  return <NavBar page="Users" pages={pages} value={3} />
}

export default Users
