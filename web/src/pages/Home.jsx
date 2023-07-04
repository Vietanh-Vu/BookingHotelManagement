import NavBar from '../components/NavBar.jsx'
import {pages} from './Var.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SignIn from './Login/SignIn.jsx'
import HomeIcon from '@mui/icons-material/Home'

function Home() {
  return (
    <>
      <NavBar pages={pages} value={0} />
      <PageHeader
        title="Home"
        subTitle="Home page"
        icon={<HomeIcon fontSize="medium" />}
      />
    </>
  )
}

export default Home
