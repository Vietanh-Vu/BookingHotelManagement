import {makeStyles} from '@mui/styles'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
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
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import ApartmentIcon from '@mui/icons-material/Apartment'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import CloseIcon from '@mui/icons-material/Close'
import Controls from '../../components/controls/Controls.jsx'
import NavBar from '../../components/NavBar.jsx'
import {pages} from '../Var.jsx'
import HotelsForm from './HotelsForm.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import Popup from '../../components/Popup.jsx'
import useTable from '../../components/useTable.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {
  deleteHotel,
  getAllHotels,
  insertHotel,
  updateHotel,
} from '../../redux/apiRequest/hotelApi.js'
import {createAxios} from '../../createInstance.js'
import {Sum} from '../../components/overview/Sum.jsx'
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon'
import {Circle} from '../../components/overview/Circle.jsx'
import {ColumnChart} from '../../components/overview/ColumnChart.jsx'
import {
  getLastMonthRevenueCategory,
  getRevenueLast12Month,
} from '../../redux/apiRequest/dashBoardApi.js'
import {store} from '../../redux/store.js'

const useStyles = makeStyles(theme => ({
  pageContent: {
    marginLeft: '64px',
    marginRight: '64px',
    padding: '16px',
  },
  overview: {
    marginLeft: '64px',
    marginRight: '64px',
    marginTop: '64px',
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
}))

const headCells = [
  {
    id: 'HotelName',
    disablePadding: false,
    disableSorting: true,
    label: 'Hotel Name',
  },
  {
    id: 'Category',
    disablePadding: false,
    disableSorting: true,
    label: 'Category',
  },
  {
    id: 'Address',
    disablePadding: false,
    disableSorting: true,
    label: 'Address',
  },
  {
    id: 'Description',
    disablePadding: false,
    disableSorting: true,
    label: 'Description',
  },
  {
    id: 'Status',
    disablePadding: false,
    disableSorting: true,
    label: 'Status',
  },
]

export default function Hotels() {
  const classes = useStyles()
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [filterActive, setFilterActive] = useState(true)
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      if (!filterActive) return items
      else return items.filter(item => item.IsActive)
    },
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let user = useSelector(state => state.auth.login?.currentUser)
  const records = useSelector(state => state.hotels.hotels?.allHotels)
  const revenueLast12Month = useSelector(
    state => state.dashBoard.revenueLast12Month?.allValues,
  )
  const lastMonthRevenueCategory = useSelector(
    state => state.dashBoard.lastMonthRevenueCategory?.allValues,
  )
  let axiosJWT = createAxios(user, dispatch, navigate)

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
    await getAllHotels(user?.accessToken, dispatch, axiosJWT)
    user = listener()
    axiosJWT = createAxios(user, dispatch, navigate)
    await getRevenueLast12Month(user?.accessToken, dispatch, axiosJWT)
    user = listener()
    axiosJWT = createAxios(user, dispatch, navigate)
    await getLastMonthRevenueCategory(user?.accessToken, dispatch, axiosJWT)
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
          if (!filterActive) return items
          else return items.filter(item => item.IsActive)
        } else {
          if (!filterActive)
            return items.filter(x =>
              x.HotelName.toLowerCase().includes(target.value),
            )
          else
            return items.filter(
              x =>
                x.HotelName.toLowerCase().includes(target.value) && x.IsActive,
            )
        }
      },
    })
  }

  const HandleFilterActive = e => {
    setFilterActive(e.target.checked)
  }

  useEffect(() => {
    setFilterFn({
      fn: items => {
        if (!filterActive) return items
        else return items.filter(item => item.IsActive)
      },
    })
  }, [filterActive])

  const addOrEdit = async (hotel, resetForm) => {
    if (hotel.HotelId == '') {
      const resMsg = await insertHotel(
        user?.accessToken,
        dispatch,
        axiosJWT,
        hotel,
      )
      alert(resMsg)
    } else {
      const resMsg = await updateHotel(
        user?.accessToken,
        dispatch,
        axiosJWT,
        hotel,
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

  const total = lastMonthRevenueCategory
    ?.map(item => item.Income)
    .reduce((partialSum, a) => partialSum + a, 0)

  return (
    <>
      <NavBar page="Hotels" pages={pages} value={1} />
      <PageHeader
        title="Hotels"
        subTitle="List of hotels"
        icon={<ApartmentIcon fontSize="medium" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Hotels"
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
                  checked={filterActive}
                  onChange={HandleFilterActive}
                />
              }
              label="Show Active"
            />
          </FormControl>
          <TableBody>
            {recordsAfterPagingAndSorting() &&
              recordsAfterPagingAndSorting().map(item => (
                <TableRow key={item.ID[0]}>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/hotels/rooms/${item.HotelId}/${item.HotelName}`,
                      )
                    }>
                    {item.HotelName}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/hotels/rooms/${item.HotelId}/${item.HotelName}`,
                      )
                    }>
                    {item.CategoryName}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/hotels/rooms/${item.HotelId}/${item.HotelName}`,
                      )
                    }>
                    {item.Address}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/hotels/rooms/${item.HotelId}/${item.HotelName}`,
                      )
                    }>
                    {item.Description}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/hotels/rooms/${item.HotelId}/${item.HotelName}`,
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
                        const resMsg = await deleteHotel(
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
      <Popup
        title="Hotel form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
        <HotelsForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Paper className={classes.overview}>
        <Container maxWidth="xl">
          <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid item xs={3}>
              <Sum
                difference={
                  revenueLast12Month &&
                  Math.round(
                    (revenueLast12Month[11].REVENUE /
                      revenueLast12Month[10].REVENUE -
                      1) *
                      100,
                  )
                }
                isPositive={
                  revenueLast12Month
                    ? revenueLast12Month[11].REVENUE >
                      revenueLast12Month[10].REVENUE
                      ? true
                      : false
                    : true
                }
                sx={{height: '100%'}}
                value={
                  revenueLast12Month &&
                  USDollar.format(revenueLast12Month[11].REVENUE)
                }
                icon={<CurrencyDollarIcon />}
                description="Compared with the previous month"
                label="Income of all hotels last month"
              />
            </Grid>
            {/* <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid> */}
            <Grid item xs={9}>
              <Circle
                chartSeries={
                  lastMonthRevenueCategory
                    ? lastMonthRevenueCategory.map(item =>
                        Math.round((item.Income / total) * 100),
                      )
                    : [1, 2, 3]
                }
                labels={
                  lastMonthRevenueCategory
                    ? lastMonthRevenueCategory.map(item => item.CategoryName)
                    : [1, 2, 3]
                }
                sx={{height: '100%'}}
                label="Income of each category"
              />
            </Grid>
            <Grid xs={12}>
              <ColumnChart
                chartSeries={[
                  {
                    name: 'Revenue',
                    data: revenueLast12Month
                      ? revenueLast12Month.map(item => item.REVENUE / 1000)
                      : [1, 2, 3],
                  },
                ]}
                sx={{height: '100%'}}
                months={
                  revenueLast12Month &&
                  revenueLast12Month.map(item => item.MONTH)
                }
                years={
                  revenueLast12Month &&
                  revenueLast12Month.map(item => item.YEAR)
                }
                label="Income of all hotels last 12 months"
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  )
}
