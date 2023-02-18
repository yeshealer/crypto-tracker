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
import ReceivedTxnIcon from 'mdi-material-ui/WalletPlus'
import SentTxnIcon from 'mdi-material-ui/Wallet'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import ClockIcon from 'mdi-material-ui/Clock'
import BlockIcon from 'mdi-material-ui/Codepen'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Third party interface
import { txnOverviewListTypes } from 'src/pages/address-search'

interface TransactionsType {
    time: number;
    block: number;
}

interface DataType {
    stats?: string;
    title: string;
    color: ThemeColor;
    icon?: ReactElement;
    details?: TransactionsType;
}

interface TransactionsOverviewTypes {
    txnOverviewList: txnOverviewListTypes
}

export default function TransactionsOverview({
    txnOverviewList
}: TransactionsOverviewTypes) {

    const summaryData: DataType[] = [
        {
            stats: txnOverviewList.receivedTxn.toString(),
            title: 'Received Transaction',
            color: 'success',
            icon: <ReceivedTxnIcon sx={{ fontSize: '1.75rem' }} />
        },
        {
            stats: txnOverviewList.sentTxn.toString(),
            title: 'Sent Transaction',
            color: 'error',
            icon: <SentTxnIcon sx={{ fontSize: '1.75rem' }} />
        },
        {
            stats: `$${txnOverviewList.receivedAmount.toFixed(4)}`,
            color: 'success',
            title: 'Received Amount',
            icon: <ReceivedTxnIcon sx={{ fontSize: '1.75rem' }} />
        },
        {
            stats: `$${txnOverviewList.sentAmount.toFixed(4)}`,
            color: 'error',
            title: 'Sent Amount',
            icon: <SentTxnIcon sx={{ fontSize: '1.75rem' }} />
        },
        // {
        //     color: 'success',
        //     title: 'First Seen Receiving',
        //     icon: <ReceivedTxnIcon sx={{ fontSize: '1.75rem' }} />,
        //     details: {
        //         time: 1548769090000,
        //         block: 1
        //     }
        // },
        // {
        //     color: 'error',
        //     title: 'First Seen Sending',
        //     icon: <SentTxnIcon sx={{ fontSize: '1.75rem' }} />,
        //     details: {
        //         time: 1548769090000,
        //         block: 1
        //     }
        // },
        // {
        //     color: 'success',
        //     title: 'Last Seen Receiving',
        //     icon: <ReceivedTxnIcon sx={{ fontSize: '1.75rem' }} />,
        //     details: {
        //         time: 1548769090000,
        //         block: 1
        //     }
        // },
        // {
        //     color: 'error',
        //     title: 'Last Seen Sending',
        //     icon: <SentTxnIcon sx={{ fontSize: '1.75rem' }} />,
        //     details: {
        //         time: 1548769090000,
        //         block: 1
        //     }
        // }
    ]

    const renderStats = () => {
        // ** Hook
        const theme = useTheme()

        return summaryData.map((item: DataType, index: number) => (
            <Grid item xs={12} sm={6} key={index}>
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
                        {item.stats ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                    variant='subtitle2'
                                >
                                    {item.stats}
                                </Typography>
                            </Box>
                        ) : item.details ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography
                                    variant='subtitle2'
                                    sx={{
                                        backgroundColor: theme.palette.background.default,
                                        color: theme.palette.text.primary,
                                        borderRadius: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        px: 2
                                    }}
                                >
                                    <ClockIcon sx={{ fontSize: '1.25rem' }} />
                                    {item.details.time}
                                </Typography>
                                <Typography
                                    variant='subtitle2'
                                    sx={{
                                        backgroundColor: theme.palette.background.default,
                                        color: theme.palette.text.primary,
                                        borderRadius: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        px: 2
                                    }}
                                >
                                    <BlockIcon sx={{ fontSize: '1.25rem' }} />
                                    {item.details.block}
                                </Typography>
                            </Box>
                        ) : null}
                    </Box>
                </Box>
            </Grid >
        ))
    }

    return (
        <Card>
            <CardHeader
                title='Transactions Overview'
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
