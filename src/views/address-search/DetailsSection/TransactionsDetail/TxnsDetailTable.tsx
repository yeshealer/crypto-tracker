// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge';
import TableContainer from '@mui/material/TableContainer'
import { useTheme } from '@mui/material/styles'

interface CurrencyTypes {
    address: string;
    symbol: string;
    tokenType: string;
}

export interface CurrencyTxnTypes {
    count_in: number;
    count_out: number;
    currency: CurrencyTypes;
    sum_in: number;
    sum_in_usd: number;
    sum_out: number;
    sum_out_usd: number;
}

interface CurrencyTxnsProps {
    currencyTxns: CurrencyTxnTypes[];
}

const TxnsDetailTable = ({
    currencyTxns
}: CurrencyTxnsProps) => {
    const theme = useTheme()
    return (
        <Card>
            <TableContainer>
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
                        {currencyTxns.length > 0 ? (currencyTxns.map((row: CurrencyTxnTypes) => (
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
            </TableContainer>
        </Card>
    )
}

export default TxnsDetailTable
