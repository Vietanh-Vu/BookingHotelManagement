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
  Checkbox,
  FormControlLabel,
  FormControl,
  Container,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import BedroomChildIcon from '@mui/icons-material/BedroomChild'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import CloseIcon from '@mui/icons-material/Close'
import Controls from '../../components/controls/Controls.jsx'
import NavBar from '../../components/NavBar.jsx'
import {pages} from '../Var.jsx'
import RoomsForm from './RoomsForm.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import Popup from '../../components/Popup.jsx'
import useTable from '../../components/useTable.jsx'
import {
  deleteRoom,
  getAllRoom,
  insertRoom,
  updateRoom,
} from '../../redux/apiRequest/roomApi.js'
import {useDispatch, useSelector} from 'react-redux'
import {createAxios} from '../../createInstance.js'
import {
  getHotelRevenueLast12Month,
  getLastMonthRevenueRoomType,
} from '../../redux/apiRequest/dashBoardApi.js'
import {Sum} from '../../components/overview/Sum.jsx'
import {Circle} from '../../components/overview/Circle.jsx'
import {ColumnChart} from '../../components/overview/ColumnChart.jsx'
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon'
import {store} from '../../redux/store.js'

const useStyles = makeStyles(theme => ({
  pageContent: {
    marginLeft: '64px',
    marginRight: '64px',
    padding: '16px',
  },
  searchInput: {
    width: '75%',
  },
  newButton: {
    left: '40px',
  },
  filterActive: {
    left: '40px',
  },
  overview: {
    marginLeft: '64px',
    marginRight: '64px',
    marginTop: '64px',
    padding: '16px',
  },
}))

const headCells = [
  {
    id: 'roomName',
    disablePadding: false,
    disableSorting: true,
    label: 'Room Name',
  },
  {
    id: 'roomType',
    disablePadding: false,
    disableSorting: true,
    label: 'Room Type',
  },
  {
    id: 'CurrentPrice',
    disablePadding: false,
    label: 'Current Price',
  },
  {
    id: 'description',
    disablePadding: false,
    disableSorting: true,
    label: 'Description',
  },
  {
    id: 'available',
    disablePadding: false,
    disableSorting: true,
    label: 'Available',
  },
  {
    id: 'status',
    disablePadding: false,
    disableSorting: true,
    label: 'Status',
  },
]

const initialFilters = {
  filterActive: true,
  filterAvailable: false,
}

export default function Rooms() {
  const classes = useStyles()
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [filter, setFilter] = useState(initialFilters)
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items.filter(
        item =>
          (item.IsActive || !filter.filterActive) &&
          (item.IsAvailable || !filter.filterAvailable),
      )
    },
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let user = useSelector(state => state.auth.login?.currentUser)
  const records = useSelector(state => state.rooms.rooms?.allRooms)
  const hotelRevenueLast12Month = useSelector(
    state => state.dashBoard.hotelRevenueLast12Month?.allValues,
  )
  const lastMonthRevenueRoomType = useSelector(
    state => state.dashBoard.lastMonthRevenueRoomType?.allValues,
  )
  let axiosJWT = createAxios(user, dispatch, navigate)
  const {hotelId, hotelName} = useParams()

  function select(state) {
    return state.auth.login?.currentUser
  }

  function listener() {
    let user = select(store.getState())
    return user
  }

  useEffect(async () => {
    if (!user) {
      navigate('/admin/login')
    }
    await getAllRoom(user?.accessToken, dispatch, axiosJWT, hotelId)
    user = listener()
    axiosJWT = createAxios(user, dispatch, navigate)
    await getHotelRevenueLast12Month(
      user?.accessToken,
      dispatch,
      axiosJWT,
      hotelId,
    )
    user = listener()
    axiosJWT = createAxios(user, dispatch, navigate)
    await getLastMonthRevenueRoomType(user?.accessToken, dispatch, axiosJWT)
    user = listener()
    axiosJWT = createAxios(user, dispatch, navigate)
  }, [])

  const {TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting} =
    useTable(records, headCells, filterFn)

  const handleSearch = e => {
    const target = e.target
    setFilterFn({
      fn: items => {
        if (target.value == '') {
          return items.filter(
            item =>
              (item.IsActive || !filter.filterActive) &&
              (item.IsAvailable || !filter.filterAvailable),
          )
        } else {
          return items.filter(
            x =>
              x.RoomName.toLowerCase().includes(target.value) &&
              (x.IsActive || !filter.filterActive) &&
              (x.IsAvailable || !filter.filterAvailable),
          )
        }
      },
    })
  }

  const handleFilter = e => {
    const {name, checked} = e.target
    setFilter({
      ...filter,
      [name]: checked,
    })
  }

  useEffect(() => {
    setFilterFn({
      fn: items => {
        return items.filter(
          item =>
            (item.IsActive || !filter.filterActive) &&
            (item.IsAvailable || !filter.filterAvailable),
        )
      },
    })
  }, [filter])

  const addOrEdit = async (room, resetForm) => {
    if (room.RoomId == '') {
      const resMsg = await insertRoom(
        user?.accessToken,
        dispatch,
        axiosJWT,
        room,
        hotelId,
      )
      alert(resMsg)
    } else {
      const resMsg = await updateRoom(
        user?.accessToken,
        dispatch,
        axiosJWT,
        room,
        hotelId,
      )
      alert(resMsg)
    }
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
  }

  const openInPopup = item => {
    // console.log(item)
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const total = lastMonthRevenueRoomType
    ?.map(item => item.Doanhthu)
    .reduce((partialSum, a) => partialSum + a, 0)

  return (
    <>
      <NavBar page="Hotels" pages={pages} value={1} />
      <PageHeader
        title={`Rooms of ${hotelName}`}
        subTitle="List of rooms"
        icon={<BedroomChildIcon fontSize="medium" />}
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
          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true)
              setRecordForEdit(null)
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="filterActive"
                  color="primary"
                  checked={filter.filterActive}
                  onChange={handleFilter}
                />
              }
              label="Show Active"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="filterAvailable"
                  color="primary"
                  checked={filter.filterAvailable}
                  onChange={handleFilter}
                />
              }
              label="Show Available"
            />
          </FormControl>
          <TableBody>
            {recordsAfterPagingAndSorting() &&
              recordsAfterPagingAndSorting().map(item => (
                <TableRow key={item.ID[0]}>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/hotels/rooms/${hotelId}/${hotelName}/${item.RoomId}/${item.RoomName}`,
                      )
                    }>
                    {item.RoomName}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/hotels/rooms/${hotelId}/${hotelName}/${item.RoomId}/${item.RoomName}`,
                      )
                    }>
                    {item.RoomTypeName}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/hotels/rooms/${hotelId}/${hotelName}/${item.RoomId}/${item.RoomName}`,
                      )
                    }>
                    {item.CurrentPrice}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/hotels/rooms/${hotelId}/${hotelName}/${item.RoomId}/${item.RoomName}`,
                      )
                    }>
                    {item.Description}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/hotels/rooms/${hotelId}/${hotelName}/${item.RoomId}/${item.RoomName}`,
                      )
                    }>
                    {item.IsAvailable ? 'Available' : 'Unavailable'}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/hotels/rooms/${hotelId}/${hotelName}/${item.RoomId}/${item.RoomName}`,
                      )
                    }>
                    {item.IsActive ? 'Active' : 'Inactive'}
                  </TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(item)
                      }}>
                      <ModeEditOutlineIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={async () => {
                        const resMsg = await deleteRoom(
                          user?.accessToken,
                          dispatch,
                          axiosJWT,
                          item,
                        )
                        alert(resMsg)
                      }}>
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Paper className={classes.overview}>
        <Container maxWidth="xl">
          <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid item xs={3}>
              <Sum
                difference={
                  hotelRevenueLast12Month &&
                  Math.round(
                    (hotelRevenueLast12Month[11].INCOME /
                      hotelRevenueLast12Month[10].INCOME -
                      1) *
                      100,
                  )
                }
                isPositive={
                  hotelRevenueLast12Month
                    ? hotelRevenueLast12Month[11].INCOME >
                      hotelRevenueLast12Month[10].INCOME
                      ? true
                      : false
                    : true
                }
                sx={{height: '100%'}}
                value={
                  hotelRevenueLast12Month &&
                  USDollar.format(hotelRevenueLast12Month[11].INCOME)
                }
                icon={<CurrencyDollarIcon />}
                description="Compared with the previous month"
                label={`Income of  ${hotelName} last month`}
              />
            </Grid>
            {/* <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid> */}
            <Grid item xs={9}>
              <Circle
                chartSeries={
                  lastMonthRevenueRoomType
                    ? lastMonthRevenueRoomType.map(item =>
                        Math.round((item.Doanhthu / total) * 100),
                      )
                    : [1, 2, 3]
                }
                labels={
                  lastMonthRevenueRoomType
                    ? lastMonthRevenueRoomType.map(item => item.RoomTypeName)
                    : [1, 2, 3]
                }
                sx={{height: '100%'}}
                label={`Income of each room type of ${hotelName}`}
              />
            </Grid>
            <Grid xs={12}>
              <ColumnChart
                chartSeries={[
                  {
                    name: 'Revenue',
                    data: hotelRevenueLast12Month
                      ? hotelRevenueLast12Month.map(item => item.INCOME / 1000)
                      : [1, 2, 3],
                  },
                ]}
                sx={{height: '100%'}}
                months={
                  hotelRevenueLast12Month &&
                  hotelRevenueLast12Month.map(item => item.MONTH)
                }
                years={
                  hotelRevenueLast12Month &&
                  hotelRevenueLast12Month.map(item => item.YEAR)
                }
                label={`Income of ${hotelName} last 12 months`}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Popup
        title="Room form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
        <RoomsForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </>
  )
}
