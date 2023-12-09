import {Paper, Card, Typography, Button} from '@mui/material'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fdfdff',
  },
  pageHeader: {
    padding: '32px',
    display: 'flex',
    marginBottom: '8px',
    marginTop: '60px'
  },
  pageIcon: {
    display: 'inline-block',
    padding: '16px',
    color: '#3c44b1',
  },
  pageTitle: {
    paddingLeft: '32px',
    '& .MuiTypography-subtitle2': {
      opacity: '0.6',
    },
  },
}))

export default function Header(props) {
  const classes = useStyles()
  const {title, subTitle, icon} = props

  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  )
}
