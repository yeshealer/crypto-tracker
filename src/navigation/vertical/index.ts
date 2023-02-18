// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import MapSearch from 'mdi-material-ui/MapSearch';
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import SupportIcon from 'mdi-material-ui/SettingsHelper'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    // {
    //   title: 'Dashboard',
    //   icon: HomeOutline,
    //   path: '/'
    // },
    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // },
    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    {
      sectionTitle: 'Managements'
    },
    {
      title: 'Address Search',
      icon: MapSearch,
      path: '/address-search'
    },
    {
      title: 'Wallet Statement',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Money Flow Graph',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Address Monitoring',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Deconfliction',
      path: '/form-layouts'
    },
    {
      icon: SupportIcon,
      title: 'Support',
      path: '/form-layouts'
    }
  ]
}

export default navigation
