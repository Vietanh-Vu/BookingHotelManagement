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
} from '@mui/material'
import axios from 'axios'
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
import { useDispatch, useSelector } from 'react-redux'
import { createAxios } from '../../createInstance.js'

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
    id: 'roomName',
    disablePadding: false,
    label: 'Room Name',
  },
  {
    id: 'roomType',
    disablePadding: false,
    label: 'Room Type',
  },
  {
    id: 'price',
    disablePadding: false,
    label: 'Current Price',
  },
  {
    id: 'description',
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'available',
    disablePadding: false,
    label: 'Available',
  },
  {
    id: 'status',
    disablePadding: false,
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
  const user = useSelector(state => state.auth.login?.currentUser)
  const records = useSelector(state => state.rooms.rooms?.allRooms)
  let axiosJWT = createAxios(user, dispatch)
  const {hotelId, hotelName} = useParams()

  useEffect(() => {
    if (!user) {
      navigate('/admin/login')
    }
    getAllRoom(user?.accessToken, dispatch, axiosJWT, hotelId)
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
    console.log(item)
    setRecordForEdit(item)
    setOpenPopup(true)
  }

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
            {recordsAfterPaging() &&
              recordsAfterPaging().map(item => (
                <TableRow key={item.ID[0]}>
                  <TableCell>{item.RoomName}</TableCell>
                  <TableCell>{item.RoomTypeName}</TableCell>
                  <TableCell>{item.CurrentPrice}</TableCell>
                  <TableCell>{item.Description}</TableCell>
                  <TableCell>
                    {item.IsAvailable ? 'Available' : 'Unavailable'}
                  </TableCell>
                  <TableCell>{item.IsActive ? 'Active' : 'Inactive'}</TableCell>
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
                        const resMsg = await deleteRoom(user?.accessToken, dispatch, axiosJWT, item);
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
        title="Room form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
        <RoomsForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </>
  )
}
