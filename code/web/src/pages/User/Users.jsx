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
import SearchIcon from '@mui/icons-material/Search'
import GroupIcon from '@mui/icons-material/Group'
import CloseIcon from '@mui/icons-material/Close'
import Controls from '../../components/controls/Controls.jsx'
import AddIcon from '@mui/icons-material/Add'
import NavBar from '../../components/NavBar.jsx'
import {pages} from '../Var.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import useTable from '../../components/useTable.jsx'
import {
  getAllUsers,
  deleteAdmin,
  setAdmin,
} from '../../redux/apiRequest/userApi.js'
import {useDispatch, useSelector} from 'react-redux'
import {createAxios} from '../../createInstance.js'
import {Sum} from '../../components/overview/Sum.jsx'
import {Circle} from '../../components/overview/Circle.jsx'
import {ColumnChart} from '../../components/overview/ColumnChart.jsx'
import PersonIcon from '@mui/icons-material/Person'
import {
  getTotalMonthlyUsersLast12Month,
  getTotalNewUsersLastMonth,
  getTotalOldUsersLastMonth,
} from '../../redux/apiRequest/dashBoardApi.js'
import {Number} from '../../components/overview/Number.jsx'
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
    id: 'fullName',
    disablePadding: false,
    disableSorting: true,
    label: 'Full Name',
  },
  {
    id: 'email',
    disablePadding: false,
    disableSorting: true,
    label: 'Email',
  },
  {
    id: 'phone',
    disablePadding: false,
    disableSorting: true,
    label: 'Phone',
  },
  {
    id: 'address',
    disablePadding: false,
    disableSorting: true,
    label: 'Address',
  },
  {
    id: 'role',
    disablePadding: false,
    disableSorting: true,
    label: 'Role',
  },
]

const initialFilters = {
  filterAdmin: false,
}

export default function Users() {
  const classes = useStyles()
  const [filter, setFilter] = useState(initialFilters)
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items?.filter(item => item.IsAdmin || !filter.filterAdmin)
    },
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let user = useSelector(state => state.auth.login?.currentUser)
  const records = useSelector(state => state.users.users?.allUsers)
  const totalMonthlyUsersLast12Month = useSelector(
    state => state.dashBoard.totalMonthlyUsersLast12Month?.allValues,
  )
  const totalNewUsersLastMonth = useSelector(
    state => state.dashBoard.totalNewUsersLastMonth?.allValues,
  )
  const totalOldUsersLastMonth = useSelector(
    state => state.dashBoard.totalOldUsersLastMonth?.allValues,
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
    await getAllUsers(user?.accessToken, dispatch, axiosJWT)
    user = listener()
    axiosJWT = createAxios(user, dispatch, navigate)
    await getTotalMonthlyUsersLast12Month(user?.accessToken, dispatch, axiosJWT)
    user = listener()
    axiosJWT = createAxios(user, dispatch, navigate)
    await getTotalNewUsersLastMonth(user?.accessToken, dispatch, axiosJWT)
    user = listener()
    axiosJWT = createAxios(user, dispatch, navigate)
    await getTotalOldUsersLastMonth(user?.accessToken, dispatch, axiosJWT)
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
          return items?.filter(item => item.IsAdmin || !filter.filterAdmin)
        } else {
          return items?.filter(
            x =>
              (x.FirstName.toLowerCase().includes(target.value) ||
                x.LastName.toLowerCase().includes(target.value)) &&
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
        return items?.filter(item => item.IsAdmin || !filter.filterAdmin)
      },
    })
  }, [filter])

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const totalNew = totalNewUsersLastMonth
    ?.map(item => item.New_Users)
    .reduce((partialSum, a) => partialSum + a, 0)

  const totalOld = totalOldUsersLastMonth
    ?.map(item => item.OLD_Users)
    .reduce((partialSum, a) => partialSum + a, 0)

  return (
    <>
      <NavBar page="Users" pages={pages} value={2} />
      <PageHeader
        title="Users"
        subTitle="List of users"
        icon={<GroupIcon fontSize="medium" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Users"
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
        </Toolbar>
        <TblContainer>
          <TblHead />
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="filterAdmin"
                  color="primary"
                  checked={filter.filterAdmin}
                  onChange={handleFilter}
                />
              }
              label="Show Admin"
            />
          </FormControl>
          <TableBody>
            {recordsAfterPagingAndSorting() &&
              recordsAfterPagingAndSorting().map(item => (
                <TableRow key={item.UsersId}>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/users/${item.UsersId}/${
                          item.FirstName + item.LastName
                        }`,
                      )
                    }>
                    {item.FirstName + ' ' + item.LastName}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/users/${item.UsersId}/${
                          item.FirstName + item.LastName
                        }`,
                      )
                    }>
                    {item.Email}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/users/${item.UsersId}/${
                          item.FirstName + item.LastName
                        }`,
                      )
                    }>
                    {item.Phone}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/users/${item.UsersId}/${
                          item.FirstName + item.LastName
                        }`,
                      )
                    }>
                    {item.Address}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/users/${item.UsersId}/${
                          item.FirstName + item.LastName
                        }`,
                      )
                    }>
                    {item.IsAdmin ? 'Admin' : 'User'}
                  </TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={async () => {
                        await setAdmin(
                          user?.accessToken,
                          dispatch,
                          axiosJWT,
                          item,
                        )
                      }}>
                      <AddIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="primary"
                      onClick={async () => {
                        await deleteAdmin(
                          user?.accessToken,
                          dispatch,
                          axiosJWT,
                          item,
                        )
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
          <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid item xs={3}>
              <Sum
                difference={
                  totalMonthlyUsersLast12Month &&
                  Math.round(
                    (totalMonthlyUsersLast12Month[11].NumberofUsers /
                      totalMonthlyUsersLast12Month[10].NumberofUsers -
                      1) *
                      100,
                  )
                }
                isPositive={
                  totalMonthlyUsersLast12Month
                    ? totalMonthlyUsersLast12Month[11].NumberofUsers >
                      totalMonthlyUsersLast12Month[10].NumberofUsers
                      ? true
                      : false
                    : true
                }
                sx={{height: '100%'}}
                value={
                  totalMonthlyUsersLast12Month &&
                  totalMonthlyUsersLast12Month[11].NumberofUsers
                }
                icon={<PersonIcon />}
                description="Compared with the previous month"
                label="Number of guests last month"
              />
            </Grid>
            <Grid item xs={3}>
              <Number
                sx={{height: '100%'}}
                value={totalNewUsersLastMonth && totalNew}
                icon={<PersonIcon />}
                description="New Guests"
                label="Number of new guests last month"
              />
            </Grid>
            <Grid item xs={3}>
              <Number
                sx={{height: '100%'}}
                value={totalOldUsersLastMonth && totalOld}
                icon={<PersonIcon />}
                description="Old Guests"
                label="Number of old guests last month"
              />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid xs={12}>
              <ColumnChart
                chartSeries={[
                  {
                    name: 'Guests',
                    data: totalMonthlyUsersLast12Month
                      ? totalMonthlyUsersLast12Month.map(
                          item => item.NumberofUsers / 1000,
                        )
                      : [1, 2, 3],
                  },
                ]}
                sx={{height: '100%'}}
                months={
                  totalMonthlyUsersLast12Month &&
                  totalMonthlyUsersLast12Month.map(item => item.Month)
                }
                years={
                  totalMonthlyUsersLast12Month &&
                  totalMonthlyUsersLast12Month.map(item => item.Year)
                }
                label="Number of guests last 12 month"
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  )
}
