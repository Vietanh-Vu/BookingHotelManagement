import React, {useState} from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
} from '@mui/material'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(() => ({
  table: {
    marginTop: '16px',
    '& thead th': {
      fontWeight: '600',
      color: '#333996',
      backgroundColor: '#3c44b126',
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}))

export default function useTable(records, headCells, filterFn) {
  const classes = useStyles()

  const pages = [5, 10, 25]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])

  const TblContainer = props => (
    <Table className={classes.table}>{props.children}</Table>
  )

  const TblHead = props => {
    return (
      <TableHead>
        <TableRow>
          {headCells.map(headCell => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records ? records.length : 0}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )

  const recordsAfterPaging = () => {
    return records
      ? filterFn.fn(records).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
      : filterFn.fn(records)
  }

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPaging,
  }
}
