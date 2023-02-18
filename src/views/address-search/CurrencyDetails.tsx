// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'
import TableContainer from '@mui/material/TableContainer'
import { useTheme } from '@mui/material/styles'

interface EVMCurrencyTypes {
    address: string;
    symbol: string;
    tokenType: string;
}

export interface BitcoinTxnTypes {
    metric: string;
    value: string;
}

export interface CurrencyTxnTypes {
    count_in: number;
    count_out: number;
    currency: EVMCurrencyTypes;
    sum_in: number;
    sum_in_usd: number;
    sum_out: number;
    sum_out_usd: number;
}

interface CurrencyTxnsProps {
    evmCurrencyDetails: CurrencyTxnTypes[];
    network: string;
    bitcoinCurrencyDetails: BitcoinTxnTypes[];
}

const CurrencyDetails = ({
    evmCurrencyDetails,
    network,
    bitcoinCurrencyDetails
}: CurrencyTxnsProps) => {
    const theme = useTheme()
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <Card>
            <TableContainer>
                {network !== 'bitcoin' ? (
                    <Table sx={{ minWidth: 800, minHeight: 100 }} aria-label='table in dashboard'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Currency</TableCell>
                                <TableCell>Receive</TableCell>
                                <TableCell>Received Tx's</TableCell>
                                <TableCell>Send</TableCell>
                                <TableCell>Sent Tx's</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody sx={{ position: 'relative' }}>
                            {evmCurrencyDetails.length > 0 ? (evmCurrencyDetails.map((row: CurrencyTxnTypes) => (
                                <TableRow hover key={row.currency.symbol} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                    <TableCell>{row.currency.symbol}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography variant="body2" color="text.secondary">{row.sum_in.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4, })}</Typography>
                                            <Typography
                                                sx={{
                                                    backgroundColor: theme.palette.primary.main,
                                                    color: theme.palette.common.white,
                                                    fontWeight: 500,
                                                    borderRadius: 2,
                                                    fontSize: 12,
                                                    px: 2,
                                                    width: 'max-content',
                                                }}>
                                                {'$' + row.sum_in_usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4, })}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {row.count_in}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography variant="body2" color="text.secondary">{row.sum_out.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4, })}</Typography>
                                            <Typography
                                                sx={{
                                                    backgroundColor: theme.palette.primary.main,
                                                    color: theme.palette.common.white,
                                                    fontWeight: 500,
                                                    borderRadius: 2,
                                                    fontSize: 12,
                                                    px: 2,
                                                    width: 'max-content',
                                                }}>
                                                {'$' + row.sum_out_usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4, })}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {row.count_out}
                                    </TableCell>
                                </TableRow>
                            ))) : (
                                <Box sx={{ position: 'absolute', textAlign: 'center', width: '100%', p: 2 }}>
                                    No Data
                                </Box>
                            )}
                        </TableBody>
                    </Table>
                ) : (
                    <Table sx={{ minWidth: 800, minHeight: 100 }} aria-label='table in dashboard'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Metric</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ position: 'relative' }}>
                            {bitcoinCurrencyDetails.length > 0 ? (bitcoinCurrencyDetails.map((bitcoinCurrency: BitcoinTxnTypes) => (
                                <TableRow hover key={bitcoinCurrency.metric} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                    <TableCell>{bitcoinCurrency.metric}</TableCell>
                                    <TableCell sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.common.white,
                                        width: 'max-content'
                                    }}>{bitcoinCurrency.value}</TableCell>
                                </TableRow>
                            ))) : (
                                <Box sx={{ position: 'absolute', textAlign: 'center', width: '100%', p: 2 }}>
                                    No Data
                                </Box>
                            )}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            {evmCurrencyDetails.length > 0 || bitcoinCurrencyDetails.length > 0 && (
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component='div'
                    count={10}
                    rowsPerPage={10}
                    page={1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Card>
    )
}

export default CurrencyDetails
