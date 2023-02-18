// ** React Import
import { ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// ** Icons Imports
import AddressHashIcon from 'mdi-material-ui/RenameBox'
import BalanceIcon from 'mdi-material-ui/Wallet'
import TransactionsIcon from 'mdi-material-ui/History'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import ClusterIcon from 'mdi-material-ui/AtomVariant'
import ClusterCountIcon from 'mdi-material-ui/Atom'
import FlagIcon from 'mdi-material-ui/Flag'
import CopyIcon from 'mdi-material-ui/ContentCopy'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Third party interface
import { SummaryDataTypes } from 'src/pages/address-search'

interface DataType {
    stats: string;
    title: string;
    color: ThemeColor;
    icon?: ReactElement;
}

interface SummaryTypes {
    summaryList: SummaryDataTypes
}

export default function Summary({
    summaryList
}: SummaryTypes) {
    const summaryData: DataType[] = [
        {
            stats: summaryList.address,
            title: 'Address Hash',
            color: 'primary',
            icon: <AddressHashIcon sx={{ fontSize: '1.75rem' }} />
        },
        {
            stats: `${summaryList.ethBalance.toFixed(4)} ${summaryList.symbol} / ${summaryList.ethBalanceUSD.toFixed(4)}`,
            title: 'Balance',
            color: 'success',
            icon: <BalanceIcon sx={{ fontSize: '1.75rem' }} />
        },
        {
            stats: summaryList.totalTxn.toString(),
            color: 'warning',
            title: 'Transactions',
            icon: <TransactionsIcon sx={{ fontSize: '1.75rem' }} />
        },
        // {
        //     stats: '982169923',
        //     color: 'info',
        //     title: 'Cluster Identifier',
        //     icon: <ClusterIcon sx={{ fontSize: '1.75rem' }} />
        // },
        // {
        //     stats: '1',
        //     color: 'info',
        //     title: 'Number of Addresses in Cluster',
        //     icon: <ClusterCountIcon sx={{ fontSize: '1.75rem' }} />
        // },
        // {
        //     stats: '60',
        //     color: 'error',
        //     title: 'BitRank Score',
        // },
        // {
        //     stats: '0',
        //     color: 'error',
        //     title: 'Flags',
        //     icon: <FlagIcon sx={{ fontSize: '1.75rem' }} />
        // }
    ]

    const renderStats = () => {
        // ** Hook
        const theme = useTheme()

        // ** Functions
        const handlePaste = (walletAddress: string) => {
            navigator.clipboard.writeText(walletAddress)
        }

        return summaryData.map((item: DataType, index: number) => (
            <Grid item xs={12} sm={item.title === 'Address Hash' ? 12 : 6} key={index}>
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        variant='rounded'
                        sx={{
                            mr: 3,
                            width: 44,
                            height: 44,
                            boxShadow: 3,
                            color: 'common.white',
                            backgroundColor: `${item.color}.main`
                        }}
                    >
                        {item.icon}
                    </Avatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='caption'>{item.title}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant='subtitle2'
                                sx={{
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    [theme.breakpoints.down('sm')]: { width: '220px' },
                                }}
                            >
                                {item.stats}
                            </Typography>
                            {item.title === 'Address Hash' ? <CopyIcon sx={{ cursor: 'pointer', fontSize: '1rem', ml: 1 }} onClick={() => handlePaste(item.stats)} /> : null}
                        </Box>
                    </Box>
                </Box>
            </Grid >
        ))
    }

    return (
        <Card>
            <CardHeader
                title='Summary'
                action={
                    <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
                        <DotsVertical />
                    </IconButton>
                }
                titleTypographyProps={{
                    sx: {
                        lineHeight: '2rem !important',
                        letterSpacing: '0.15px !important'
                    }
                }}
            />
            <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
                <Grid container spacing={[5, 2]}>
                    {renderStats()}
                </Grid>
            </CardContent>
        </Card>
    )
}
