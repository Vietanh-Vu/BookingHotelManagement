import {makeStyles} from '@mui/styles'
import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import HistoryIcon from '@mui/icons-material/History'
import Controls from '../../components/controls/Controls.jsx'
import NavBar from '../../components/NavBar.jsx'
import {pages} from '../Var.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import useTable from '../../components/useTable.jsx'
import {getAllRoomHistory} from '../../redux/apiRequest/roomApi.js'
import {useDispatch, useSelector} from 'react-redux'
import {createAxios} from '../../createInstance.js'
import {getAllUserHistory} from '../../redux/apiRequest/userApi.js'

const useStyles = makeStyles(theme => ({
  pageContent: {
    marginLeft: '64px',
    marginRight: '64px',
    padding: '16px',
  },
  searchInput: {
    width: '75%',
  },
  filterActive: {
    left: '40px',
  },
}))

const headCells = [
  {
    id: 'RoomName',
    disablePadding: false,
    disableSorting: true,
    label: 'Room Name',
  },
  {
    id: 'RoomTypeName',
    disablePadding: false,
    disableSorting: true,
    label: 'Room Type',
  },
  {
    id: 'HotelName',
    disablePadding: false,
    disableSorting: true,
    label: 'Hotel Name',
  },
  {
    id: 'HotelAdress',
    disablePadding: false,
    disableSorting: true,
    label: 'Hotel Address',
  },
  {
    id: 'StartDate',
    disablePadding: false,
    disableSorting: true,
    label: 'Start Date',
  },
  {
    id: 'EndDate',
    disablePadding: false,
    disableSorting: true,
    label: 'End Date',
  },
  {
    id: 'DiscountPercent',
    disablePadding: false,
    disableSorting: false,
    label: 'Discount',
  },
  {
    id: 'CurrentPrice',
    disablePadding: false,
    disableSorting: false,
    label: 'Current Price',
  },
  {
    id: 'TotalPrice',
    disablePadding: false,
    disableSorting: false,
    label: 'Total Price',
  },
]

export default function UserReservationHistory() {
  const classes = useStyles()
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items
    },
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.login?.currentUser)
  const records = useSelector(state => state.users.userHistory?.allUserHistory)
  let axiosJWT = createAxios(user, dispatch, navigate)
  useEffect(() => {
    axiosJWT = createAxios(user, dispatch, navigate)
  }, [user])
  const {userId, userName} = useParams()

  useEffect(async () => {
    if (!user) {
      navigate('/admin/login')
    }
    await getAllUserHistory(user?.accessToken, dispatch, axiosJWT, userId)
  }, [])

  const {TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting} =
    useTable(records, headCells, filterFn)

  const handleSearch = e => {
    const target = e.target
    setFilterFn({
      fn: items => {
        if (target.value == '') {
          return items
        } else {
          return items.filter(x =>
            x.RoomName.toLowerCase().includes(target.value),
          )
        }
      },
    })
  }

  const dateConvert = dateString => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const year = date.getFullYear()
    const formattedDate = `${day}-${month}-${year}`
    return formattedDate
  }

  return (
    <>
      <NavBar page="Hotels" pages={pages} value={1} />
      <PageHeader
        title={`${userName}`}
        subTitle={`List of reservations of ${userName}`}
        icon={<HistoryIcon fontSize="medium" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Rooms"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting() &&
              recordsAfterPagingAndSorting().map(item => (
                <TableRow key={item.UsersId}>
                  <TableCell>{item.RoomName}</TableCell>
                  <TableCell>{item.RoomTypeName}</TableCell>
                  <TableCell>{item.HotelName}</TableCell>
                  <TableCell>{item.HotelAddress}</TableCell>
                  <TableCell>{dateConvert(item.StartDate)}</TableCell>
                  <TableCell>{dateConvert(item.EndDate)}</TableCell>
                  <TableCell>{item.DiscountPercent * 100}%</TableCell>
                  <TableCell>{item.CurrentPrice}</TableCell>
                  <TableCell>{item.TotalPrice}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  )
}
