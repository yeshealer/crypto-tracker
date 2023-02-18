// ** React Import
import React, { useState, ChangeEvent, useEffect } from 'react'

// ** Material UI
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles'

// ** Icons
import LeftIcon from 'mdi-material-ui/ArrowLeft'
import RightIcon from 'mdi-material-ui/ArrowRight'
import TopIcon from 'mdi-material-ui/ArrowUp'
import DownIcon from 'mdi-material-ui/ArrowDown'
import ExchangeIcon from 'mdi-material-ui/SwapHorizontal'

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export interface TxnDetailTypes {
    address: { address: string, annotation: string };
    amount: number;
    amount_usd: number;
    block: { height: number, timestamp: { time: string } };
    currency: { address: string, symbol: string };
    external: boolean;
    transaction: { hash: string };
    direction: string;
}

export interface BitcoinTxnDetailTypes {
    block: { height: number, timestamp: { time: string } };
    outputDirection: string;
    outputIndex: number;
    transaction: { hash: string };
    value: number;
    value_usd: number;
    direction: string;
}

interface TransactionsDetailProps {
    evmTxnDetails: TxnDetailTypes[];
    bitcoinTxnDetails: BitcoinTxnDetailTypes[];
    network: string;
}

const directionConfig = [
    {
        name: 'inflow',
        icon: <LeftIcon />
    },
    {
        name: 'allflow',
        icon: <ExchangeIcon />
    },
    {
        name: 'outflow',
        icon: <RightIcon />
    },
]

export default function TransactionsDetail({
    evmTxnDetails,
    bitcoinTxnDetails,
    network
}: TransactionsDetailProps) {
    // ** States
    // const [attribution, setAttribution] = useState('');
    const [filterResult, setFilterResult] = useState<TxnDetailTypes[]>([]);
    const [bitocoinFilterResult, setBitcoinFilterResult] = useState<BitcoinTxnDetailTypes[]>([]);
    const [filterDirection, setFilterDirection] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    // ** Hooks
    const theme = useTheme();

    // ** Functions
    // const handleChange = (event: SelectChangeEvent) => {
    //     setAttribution(event.target.value as string);
    // };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleFilterByDirection = (key: string) => {
        setFilterDirection(key);
        let middleResult: TxnDetailTypes[] = [];
        let bitcoinMiddleResult: BitcoinTxnDetailTypes[] = [];
        if (network === 'bitcoin') {
            bitcoinMiddleResult = bitcoinTxnDetails;
            if (key === 'inflow') {
                bitcoinMiddleResult = bitcoinMiddleResult.filter((txnDetail) => txnDetail.direction === 'inflow');
            } else if (key === 'outflow') {
                bitcoinMiddleResult = bitcoinMiddleResult.filter((txnDetail) => txnDetail.direction === 'outflow');
            }
        } else {
            middleResult = evmTxnDetails;
            if (key === 'inflow') {
                middleResult = middleResult.filter((txnDetail) => txnDetail.direction === 'inflow');
            } else if (key === 'outflow') {
                middleResult = middleResult.filter((txnDetail) => txnDetail.direction === 'outflow');
            }
        }
        setFilterResult(middleResult);
        setBitcoinFilterResult(bitcoinMiddleResult);
    }

    // useEffect
    useEffect(() => {
        setFilterResult(evmTxnDetails)
        setBitcoinFilterResult(bitcoinTxnDetails)
    }, [JSON.stringify(evmTxnDetails), JSON.stringify(bitcoinTxnDetails)])

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: 'max-content' }}>
                    <Typography variant='subtitle2'>Filter By Direction</Typography>
                    <ButtonGroup variant="text" color='secondary' aria-label="text button group">
                        {directionConfig.map((directionOne, index) => {
                            return (
                                filterDirection === directionOne.name ? (
                                    <Button variant='contained' key={index} onClick={() => handleFilterByDirection(directionOne.name)} sx={{ width: 50 }} color="primary">{directionOne.icon}</Button>
                                ) : (
                                    <Button key={index} onClick={() => handleFilterByDirection(directionOne.name)} sx={{ width: 50 }} color="primary">{directionOne.icon}</Button>
                                )
                            )
                        })}
                    </ButtonGroup>
                </Paper>
                {/* <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: 'max-content' }}>
                    <Typography variant='subtitle2'>Order By</Typography>
                    <ButtonGroup variant="text" color='secondary' aria-label="text button group">
                        <Button>Block<DownIcon color='error' /></Button>
                        <Button>Time<DownIcon color='error' /></Button>
                    </ButtonGroup>
                </Paper> */}
                {/* <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: 'max-content', p: 1, pt: 0 }}>
                    <Typography variant='subtitle2' sx={{ mb: 1 }}>Attribution Type</Typography>
                    <FormControl size='small' fullWidth>
                        <InputLabel id="demo-simple-select-label">Select</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={attribution}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Paper> */}
                {/* <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: 'max-content', px: 1 }}>
                    <Typography variant='subtitle2'>Filter By Crypto value</Typography>
                    <Switch {...label} defaultChecked />
                </Paper> */}
                {/* <Button variant='contained' onClick={() => handleFilter()}>Apply</Button> */}
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    {network !== 'bitcoin' ? (
                        <Table stickyHeader aria-label='sticky table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ minWidth: 200 }}>Timestamp</TableCell>
                                    <TableCell sx={{ minWidth: 100 }}>Block</TableCell>
                                    <TableCell sx={{ minWidth: 300 }}>Sender</TableCell>
                                    <TableCell sx={{ minWidth: 50 }}>Direction</TableCell>
                                    <TableCell sx={{ minWidth: 100 }}>Amount</TableCell>
                                    <TableCell sx={{ minWidth: 100 }}>Currency</TableCell>
                                    <TableCell sx={{ minWidth: 300 }}>Transaction</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterResult.length > 0 && filterResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((evmTxn: TxnDetailTypes, index: number) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{evmTxn.block.timestamp.time}</TableCell>
                                            <TableCell>{evmTxn.block.height}</TableCell>
                                            <TableCell>{evmTxn.address.annotation ? evmTxn.address.annotation : evmTxn.address.address}</TableCell>
                                            <TableCell>{evmTxn.direction !== 'inflow' ? <RightIcon color='error' /> : <LeftIcon color='success' />}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Stack>{evmTxn.amount}</Stack>
                                                    <Stack sx={{
                                                        backgroundColor: theme.palette.primary.main,
                                                        color: theme.palette.common.white,
                                                        fontWeight: 500,
                                                        borderRadius: 2,
                                                        fontSize: 12,
                                                        px: 2,
                                                        width: 'max-content',
                                                    }}>${evmTxn.amount_usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4, })}</Stack>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{evmTxn.currency.symbol.toUpperCase()}</TableCell>
                                            <TableCell>{evmTxn.transaction.hash}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    ) : (
                        <Table stickyHeader aria-label='sticky table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ minWidth: 200 }}>Timestamp</TableCell>
                                    <TableCell sx={{ minWidth: 100 }}>Block</TableCell>
                                    <TableCell sx={{ minWidth: 100 }}>Amount</TableCell>
                                    <TableCell sx={{ minWidth: 100 }}>Direction</TableCell>
                                    <TableCell sx={{ minWidth: 300 }}>Type</TableCell>
                                    <TableCell sx={{ minWidth: 50 }}>Txn's</TableCell>
                                    <TableCell sx={{ minWidth: 300 }}>Transaction</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bitocoinFilterResult.length > 0 && bitocoinFilterResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((bitcoinTxn: BitcoinTxnDetailTypes, index: number) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{bitcoinTxn.block.timestamp.time}</TableCell>
                                            <TableCell>{bitcoinTxn.block.height}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Stack>{bitcoinTxn.value}</Stack>
                                                    <Stack sx={{
                                                        backgroundColor: theme.palette.primary.main,
                                                        color: theme.palette.common.white,
                                                        fontWeight: 500,
                                                        borderRadius: 2,
                                                        fontSize: 12,
                                                        px: 2,
                                                        width: 'max-content',
                                                    }}>${bitcoinTxn.value_usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4, })}</Stack>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{bitcoinTxn.direction !== 'inflow' ? <RightIcon color='error' /> : <LeftIcon color='success' />}</TableCell>
                                            <TableCell>{bitcoinTxn.outputIndex}</TableCell>
                                            <TableCell>{bitcoinTxn.transaction.hash}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component='div'
                    count={evmTxnDetails.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}
