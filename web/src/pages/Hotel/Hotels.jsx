import {makeStyles} from '@mui/styles'
import {useState} from 'react'
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ApartmentIcon from '@mui/icons-material/Apartment'
import Controls from '../../components/controls/Controls.jsx'
import NavBar from '../../components/NavBar.jsx'
import {pages} from '../Var.jsx'
import HotelsForm from './HotelsForm.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import Popup from '../../components/Popup.jsx'

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
    right: '10px',
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
  const [records, setRecords] = useState()
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items
    },
  })
  const [openPopup, setOpenPopup] = useState(false)

  const {TblContainer, TblHead, TblPagination, recordsAfterPaging} =
    useTable(records, headCells, filterFn)

  // const handleSearch = e => {
  //   let target = e.target
  //   setFilterFn({
  //     fn: items => {
  //       if (target.value == '') return items
  //       else
  //         return items.filter(x =>
  //           x.hotelName.toLowerCase().includes(target.value),
  //         )
  //     },
  //   })
  // }

  // const addOrEdit = (hotel, resetForm) => {
  //   if (hotel.id == 0) employeeService.insertEmployee(employee)
  //   else employeeService.updateEmployee(employee)
  //   resetForm()
  //   setRecordForEdit(null)
  //   setOpenPopup(false)
  //   setRecords(employeeService.getAllEmployees())
  // }

  const openInPopup = item => {
    // setRecordForEdit(item)
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
          {/* <Controls.Input
            label="Search Employees"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          /> */}
          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true)
              // setRecordForEdit(null)
            }}
          />
        </Toolbar>
        {/* <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item)
                    }}>
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton color="secondary">
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer> */}
        {/* <TblPagination /> */}
      </Paper>
      <Popup
        title="Hotel form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
        <HotelsForm recordForEdit={false} addOrEdit={() => {}} />
      </Popup>
    </>
  )
}