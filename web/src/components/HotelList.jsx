import {useEffect, useState} from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TablePagination from '@mui/material/TablePagination'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CloseIcon from '@mui/icons-material/Close';
import Controls from './controls/Controls'



function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {props.headCells.map(headCell => (
          <TableCell key={headCell.id} align="left" padding={'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

function HotelList() {
  const [hotels, setHotels] = useState([{}])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openPopup, setOpenPopup] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/hotel/`)
      .then(res => {
        setHotels(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  console.log(hotels)

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

  const columns = [
    {field: 'hotelName', headerName: 'Hotel Name', width: 100},
    {field: 'category', headerName: 'Category', width: 100},
    {field: 'address', headerName: 'Address', width: 100},
    {field: 'description', headerName: 'Description', width: 100},
    {field: 'status', headerName: 'Status', width: 100},
  ]

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  return (
    <Box sx={{width: '100%', marginTop: '70px'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <TableContainer>
          <Table
            sx={{minWidth: 750}}
            aria-labelledby="tableTitle"
            size={'medium'}>
            <EnhancedTableHead headCells={headCells} />
            <TableBody>
              {hotels
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((hotel, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell align="left">{hotel.HotelName}</TableCell>
                      <TableCell align="left">{hotel.CategoryName}</TableCell>
                      <TableCell align="left">{hotel.Address}</TableCell>
                      <TableCell align="left">{hotel.Description}</TableCell>
                      <TableCell align="left">
                        {hotel.IsActive ? 'Active' : 'Inactive'}
                      </TableCell>
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
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default HotelList
