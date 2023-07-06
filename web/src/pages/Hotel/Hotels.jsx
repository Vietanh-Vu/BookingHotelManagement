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
  Box,
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
  const user = useSelector(state => state.auth.login?.currentUser)
  const records = useSelector(state => state.hotels.hotels?.allHotels)
  let axiosJWT = createAxios(user, dispatch, navigate)

  useEffect(() => {
    if (!user) {
      navigate('/admin/login')
    }
    getAllHotels(user?.accessToken, dispatch, axiosJWT)
  }, [])

  const {TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting} = useTable(
    records,
    headCells,
    filterFn,
  )

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
    console.log(item)
    setRecordForEdit(item)
    setOpenPopup(true)
  }

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
          <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid item xs={3.7}>
              <Sum
                difference={12}
                positive
                sx={{height: '100%'}}
                value="$24k"
                icon={<CurrencyDollarIcon />}
              />
            </Grid>
            <Grid item xs={3.3}></Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={3.7}>
              <Circle
                chartSeries={[30, 15, 22, 13, 20]}
                labels={[
                  'Category 1',
                  'Category 2',
                  'Category 3',
                  'Category 4',
                  'Category 5',
                ]}
                sx={{height: '100%'}}
              />
            </Grid>
            <Grid xs={8.3}>
              <ColumnChart
                chartSeries={[
                  {
                    name: 'Sales',
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                ]}
                sx={{height: '100%'}}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  )
}
