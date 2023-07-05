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
}))

const headCells = [
  {
    id: 'hotelName',
    disablePadding: false,
    label: 'Hotel Name',
  },
  {
    id: 'category',
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'address',
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 'description',
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'status',
    disablePadding: false,
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
  let axiosJWT = createAxios(user, dispatch)

  useEffect(() => {
    if (!user) {
      navigate('/admin/login')
    }
    getAllHotels(user?.accessToken, dispatch, axiosJWT)
  }, [])

  const {TblContainer, TblHead, TblPagination, recordsAfterPaging} = useTable(
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
      const resMsg = await updateHotel(user?.accessToken, dispatch, axiosJWT, hotel)
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
            {recordsAfterPaging() &&
              recordsAfterPaging().map(item => (
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
                        const resMsg = await deleteHotel(user?.accessToken, dispatch, axiosJWT, item);
                        alert(resMsg);
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
    </>
  )
}
