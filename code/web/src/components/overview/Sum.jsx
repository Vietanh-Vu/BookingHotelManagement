import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon'
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon'
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material'

export const Sum = props => {
  const {difference, positive = false, sx, value, icon, description, label, isPositive} = props

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {label}
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56,
            }}>
            <SvgIcon>{icon}</SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{mt: 2}}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <SvgIcon color={isPositive ? 'success' : 'error'} fontSize="small">
                {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={isPositive ? 'success.main' : 'error.main'}
                variant="body2">
                {difference}%
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="caption">
              {description}
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}
