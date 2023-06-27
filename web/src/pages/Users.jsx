import NavBar from '../components/NavBar.jsx'
import {pages} from './Var.jsx'
import PageHeader from '../components/PageHeader.jsx'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function Users() {
  return (
    <>
      <NavBar page="Users" pages={pages} value={2} />{' '}
      <PageHeader
        title="Users"
        subTitle="List of users"
        icon={<PeopleAltIcon fontSize="medium" />}
      />
    </>
  )
}

export default Users
