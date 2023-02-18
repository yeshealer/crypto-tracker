// ** NEXT Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme, useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const theme = useTheme()
  const router = useRouter()

  // ** State
  const hiddenInput = router.pathname !== '/address-search'

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          {hidden ? (
            <IconButton
              color='inherit'
              onClick={toggleNavVisibility}
              sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
            >
              <Menu />
            </IconButton>
          ) : null}
          {hiddenInput ? (
            <TextField
              size='small'
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 4 },
                [theme.breakpoints.up('md')]: { minWidth: 600 },
                [theme.breakpoints.down('md')]: { minWidth: '100%' },
                [theme.breakpoints.down('sm')]: { display: 'none' },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Magnify fontSize='small' />
                  </InputAdornment>
                )
              }}
              placeholder='Input your wallet address'
            />
          ) : null}
        </Box>
        <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
          <ModeToggler settings={settings} saveSettings={saveSettings} />
          <NotificationDropdown />
          <UserDropdown />
        </Box>
      </Box>
      {hiddenInput ? (
        <TextField
          size='small'
          sx={{
            '& .MuiOutlinedInput-root': { borderRadius: 4 },
            [theme.breakpoints.up('sm')]: { display: 'none' },
            [theme.breakpoints.down('sm')]: { width: '100%', mt: 2 },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
          placeholder='Input your wallet address'
        />
      ) : null}
    </Box>
  )
}

export default AppBarContent
