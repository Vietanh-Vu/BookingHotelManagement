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
  Box,
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
    id: 'FullName',
    disablePadding: false,
    disableSorting: true,
    label: 'Full Name',
  },
  {
    id: 'Email',
    disablePadding: false,
    disableSorting: true,
    label: 'Email',
  },
  {
    id: 'Phone',
    disablePadding: false,
    disableSorting: true,
    label: 'Phone',
  },
  {
    id: 'Address',
    disablePadding: false,
    disableSorting: true,
    label: 'Address',
  },
  {
    id: 'StartDate',
    disablePadding: false,
    disableSorting: false,
    label: 'Start Date',
  },
  {
    id: 'EndDate',
    disablePadding: false,
    disableSorting: false,
    label: 'End Date',
  },
  {
    id: 'DiscountPercent',
    disablePadding: false,
    label: 'Discount',
  },
  {
    id: 'TotalPrice',
    disablePadding: false,
    label: 'Total Price',
  },
]

export default function RoomReservationHistory() {
  const classes = useStyles()
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items
    },
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.login?.currentUser)
  const records = useSelector(state => state.rooms.roomHistory?.allRoomHistory)
  let axiosJWT = createAxios(user, dispatch, navigate)
  useEffect(() => {
    axiosJWT = createAxios(user, dispatch, navigate)
  }, [user])
  const {hotelId, hotelName, roomId, roomName} = useParams()

  let endTime = new Date()
  endTime.setDate(endTime.getDate() - 2)
  let startTime = new Date()
  startTime.setDate(startTime.getDate() - 8)
  startTime.setSeconds(startTime.getSeconds() - 1)
  const [startDate, setStartDate] = useState(startTime)
  const [endDate, setEndDate] = useState(endTime)

  useEffect(async () => {
    if (!user) {
      navigate('/admin/login')
    }
    await getAllRoomHistory(user?.accessToken, dispatch, axiosJWT, roomId)
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
          return items.filter(
            x =>
              x.FirstName.toLowerCase().includes(target.value) ||
              x.LastName.toLowerCase().includes(target.value),
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
        title={`${roomName} of ${hotelName}`}
        subTitle={`List of reservations of ${roomName}`}
        icon={<HistoryIcon fontSize="medium" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Users"
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
                  <TableCell>{item.FirstName + ' ' + item.LastName}</TableCell>
                  <TableCell>{item.Email}</TableCell>
                  <TableCell>{item.Phone}</TableCell>
                  <TableCell>{item.Address}</TableCell>
                  <TableCell>{dateConvert(item.StartDate)}</TableCell>
                  <TableCell>{dateConvert(item.EndDate)}</TableCell>
                  <TableCell>{item.DiscountPercent * 100}%</TableCell>
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
