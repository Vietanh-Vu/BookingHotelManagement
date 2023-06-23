import NavBar from '../components/NavBar.jsx'

function Home() {
  const pages = [
    {page: 'Home', path: '/admin'},
    {page: 'Show Hotels', path: '/admin/showhotels'},
    {page: 'Add Hotel', path: '/admin/addhotel'},
    {page: 'Show Users', path: '/admin/showusers'},
  ]
  return <NavBar pages={pages} value={0}/>
}

export default Home
