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
import SearchIcon from '@mui/icons-material/Search'
import BedroomChildIcon from '@mui/icons-material/BedroomChild'
import CloseIcon from '@mui/icons-material/Close'
import Controls from '../../components/controls/Controls.jsx'
import NavBar from '../../components/NavBar.jsx'
import {pages} from '../Var.jsx'
import PageHeader from '../../components/PageHeader.jsx'
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
    id: 'fullName',
    disablePadding: false,
    label: 'Full Name',
  },
  {
    id: 'email',
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'phone',
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'address',
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 'role',
    disablePadding: false,
    label: 'Role',
  },
]

const initialFilters = {
  filterAdmin: false,
}

export default function Rooms() {
  const classes = useStyles()
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [records, setRecords] = useState([])
  const [openPopup, setOpenPopup] = useState(false)
  const [filter, setFilter] = useState(initialFilters)
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items.filter(item => item.IsAdmin || !filter.filterAdmin)
    },
  })

  const getAllUser = () => {
    axios
      .get(`http://localhost:3000/admin/users/listUser`)
      .then(res => {
        setRecords(res.data)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getAllUser()
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
          return items.filter(item => item.IsAdmin || !filter.filterAdmin)
        } else {
          return items.filter(
            x =>
              x.RoomName.toLowerCase().includes(target.value) &&
              (x.IsAdmin || !filter.filterAdmin),
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
        return items.filter(item => item.IsAdmin || !filter.filterAdmin)
      },
    })
  }, [filter])

  const deleteAdmin = user => {
    axios
      .delete(`http://localhost:3000/admin/hotel/rooms/delete/${room.RoomId}`)
      .then(res => {
        alert(res.data.message)
      })
      .catch(error => console.log(error))
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
                      onClick={() => {
                        deleteRoom(item)
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
