import {makeStyles} from '@mui/styles'
import {useEffect, useState} from 'react'
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
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

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: '64px',
    padding: '16px',
  },
  searchInput: {
    width: '75%',
  },
  newButton: {
    position: 'absolute',
    left: '30px',
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
  const [records, setRecords] = useState([])
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items
    },
  })
  const [openPopup, setOpenPopup] = useState(false)

  const getAllHotel = () => {
    axios
      .get(`http://localhost:3000/admin/hotel/`)
      .then(res => {
        setRecords(
          res.data.map(hotel => ({
            ...hotel,
            CategoryId: hotel.CategoryId[0],
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
        if (target.value == '') return items
        else
          return items.filter(x =>
            x.HotelName.toLowerCase().includes(target.value),
          )
      },
    })
  }

  const insertHotel = hotel => {
    const formData = new FormData()
    formData.append('myImage', hotel.ImgSelected)
    axios
      .post(`http://localhost:3000/admin/hotel/add/image`, formData)
      .then(response => {
        const hotelData = {
          CategoryId: hotel.CategoryId,
          HotelName: hotel.HotelName,
          IsActive: hotel.IsActive ? true : false,
          Address: hotel.Address,
          Description: hotel.Description,
          HotelImg: response.data.nameFile,
        }
        axios
          .post('http://localhost:3000/admin/hotel/add', hotelData)
          .then(response => {
            alert(response.data.message)
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const updateHotel = hotel => {
    if (hotel.ImgSelected) {
      const formData = new FormData()
      formData.append('myImage', hotel.ImgSelected)
      axios
        .post(`http://localhost:3000/admin/hotel/add/image`, formData)
        .then(response => {
          const hotelData = {
            CategoryId: hotel.CategoryId,
            HotelName: hotel.HotelName,
            IsActive: hotel.IsActive ? true : false,
            Address: hotel.Address,
            Description: hotel.Description,
            HotelImg: response.data.nameFile,
          }
          console.log(hotelData)
          axios
            .put(
              `http://localhost:3000/admin/hotel/update/${hotel.HotelId}`,
              hotelData,
            )
            .then(response => {
              alert(response.data.message)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      const hotelData = {
        CategoryId: hotel.CategoryId,
        HotelName: hotel.HotelName,
        IsActive: hotel.IsActive ? true : false,
        Address: hotel.Address,
        Description: hotel.Description,
        HotelImg: hotel.HotelImg,
      }
      console.log(hotelData)
      axios
        .put(
          `http://localhost:3000/admin/hotel/update/${hotel.HotelId}`,
          hotelData,
        )
        .then(response => {
          alert(response.data.message)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const addOrEdit = (hotel, resetForm) => {
    if (hotel.HotelId == '') insertHotel(hotel)
    else updateHotel(hotel)
    getAllHotel()
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
            label="Search Employees"
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
          <TableBody>
            {recordsAfterPaging() &&
              recordsAfterPaging().map(item => (
                <TableRow key={item.ID[0]}>
                  <TableCell>{item.HotelName}</TableCell>
                  <TableCell>{item.CategoryName}</TableCell>
                  <TableCell>{item.Address}</TableCell>
                  <TableCell>{item.Description}</TableCell>
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
        title="Hotel form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
        <HotelsForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </>
  )
}
