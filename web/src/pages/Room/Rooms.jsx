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

export default function Rooms() {
  const classes = useStyles()
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [records, setRecords] = useState([])
  const [openPopup, setOpenPopup] = useState(false)
  const [filterActive, setFilterActive] = useState(false)
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      if (!filterActive) return items
      else return items.filter(item => item.IsActive)
    },
  })
  const navigate = useNavigate()
  const {hotelId} = useParams()

  const getAllRoom = () => {
    axios
      .get(`http://localhost:3000/admin/hotel/rooms/${hotelId}`)
      .then(res => {
        setRecords(
          res.data.map(room => ({
            ...room,
            RoomTypeId: room.RoomTypeId[0],
          })),
        )
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getAllHotel()
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
              x.RoomName.toLowerCase().includes(target.value),
            )
          else
            return items.filter(
              x =>
                x.RoomName.toLowerCase().includes(target.value) && x.IsActive,
            )
        }
      },
    })
  }

  const insertRoom = room => {
    const roomData = {
      RoomTypeId: room.RoomTypeId,
      RoomName: room.RoomName,
      CurrentPrice: room.CurrentPrice,
      IsAvailable: room.IsAvailable ? true : false,
      Description: room.Description,
      IsActive: room.IsActive ? true : false,
    }
    axios
      .post(`http://localhost:3000/admin/hotel/rooms/${hotelId}`, hotelData)
      .then(response => {
        alert(response.data.message)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const updateRoom = room => {
    const roomData = {
      HotelId: hotelId,
      RoomTypeId: room.RoomTypeId,
      RoomName: room.RoomName,
      CurrentPrice: room.CurrentPrice,
      IsAvailable: room.IsAvailable ? true : false,
      Description: room.Description,
      IsActive: room.IsActive ? true : false,
    }
    axios
      .put(
        `http://localhost:3000/admin/hotel/room/update/${hotel.HotelId}`,
        hotelData,
      )
      .then(response => {
        alert(response.data.message)
      })
      .catch(error => {
        console.log(error)
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

  const addOrEdit = (room, resetForm) => {
    if (room.RoomId == '') insertRoom(room)
    else updateRoom(room)
    getAllRoom()
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
        title="Rooms"
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
                  <TableCell>{item.RoomName}</TableCell>
                  <TableCell>{item.RoomType}</TableCell>
                  <TableCell>{item.CurrentPrice}</TableCell>
                  <TableCell>{item.Description}</TableCell>
                  <TableCell>{item.IsAvailable ? 'Available' : 'Unavailable'}</TableCell>
                  <TableCell>{item.IsActive ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(item)
                      }}>
                      <ModeEditOutlineIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton color="secondary">
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