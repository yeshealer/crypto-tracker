// ** React Imports
import { Fragment, useState, forwardRef } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useTheme } from '@mui/material/styles'
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// ** Icons Imports
import Magnify from 'mdi-material-ui/Magnify'
import Submit from 'mdi-material-ui/Send'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CurrencyDetails from 'src/views/address-search/CurrencyDetails'
import Summary from 'src/views/address-search/Summary'
import TransactionsOverview from 'src/views/address-search/TransactionsOverview'
import DetailsSection from 'src/views/address-search/DetailsSection'
import TopFilterBar from 'src/views/address-search/TopFilterBar'
import { CurrencyTxnTypes, BitcoinTxnTypes } from 'src/views/address-search/CurrencyDetails'
import { BitcoinTxnDetailTypes, TxnDetailTypes } from 'src/views/address-search/DetailsSection/TransactionsDetail';

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Third Party
import { Dayjs } from 'dayjs';

interface RequestOptionsTypes {
    method: string;
    headers: Headers;
    body: any;
}

export interface SummaryDataTypes {
    address: string;
    ethBalance: number;
    ethBalanceUSD: number;
    totalTxn: number;
    symbol: string;
}

export interface txnOverviewListTypes {
    receivedTxn: number;
    sentTxn: number;
    receivedAmount: number;
    sentAmount: number;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddressSearch = () => {
    // ** Hook
    const theme = useTheme();

    // ** State
    const [searchAddress, setSearchAddress] = useState<string>('');
    const [evmCurrencyDetails, setEvmCurrencyDetails] = useState<CurrencyTxnTypes[]>([]);
    const [bitcoinCurrencyDetails, setBitcoinCurrencyDetails] = useState<BitcoinTxnTypes[]>([]);
    const [evmTxnDetails, setEVMTxnDetails] = useState<TxnDetailTypes[]>([]);
    const [bitcoinTxnDetails, setBitcoinTxnDetails] = useState<BitcoinTxnDetailTypes[]>([]);
    const [summaryList, setSummaryList] = useState<SummaryDataTypes>({
        address: '',
        ethBalance: 0,
        ethBalanceUSD: 0,
        totalTxn: 0,
        symbol: 'ETH',
    })
    const [txnOverviewList, setTxnOverviewList] = useState<txnOverviewListTypes>({
        receivedTxn: 0,
        sentTxn: 0,
        receivedAmount: 0,
        sentAmount: 0
    })
    const [isBackDrop, setIsBackDrop] = useState<boolean>(false);
    const [isShowDetails, setIsShowDetails] = useState<boolean>(false);
    const [network, setNetwork] = useState<string>('');
    const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);

    // ** Alert
    const [networkAlert, setnetworkAlert] = useState<boolean>(false);
    const [selectDateAlert, setSelectDateAlert] = useState<boolean>(false);

    // ** Functions
    const handleSearchAddress = async (handleAddress: string) => {
        setIsBackDrop(true);
        if (network === '') {
            setnetworkAlert(true)
        } else if (dateRange[0] === null || dateRange[1] === null) {
            setSelectDateAlert(true)
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("X-API-KEY", "BQYD3gjkrZwjnBP1d01pNCEY7nQrWAfB");
            const fromDay = dateRange[0].date() > 9 ? dateRange[0].date().toString() : `0${dateRange[0].date().toString()}`;
            const fromMonth = dateRange[0].month() > 8 ? (dateRange[0].month() + 1).toString() : `0${(dateRange[0].month() + 1).toString()}`;
            const fromYear = dateRange[0].year().toString();
            const toDay = dateRange[1].date() > 9 ? dateRange[1].date().toString() : `0${dateRange[1].date().toString()}`;
            const toMonth = dateRange[1].month() > 8 ? (dateRange[1].month() + 1).toString() : `0${(dateRange[1].month() + 1).toString()}`;
            const toYear = dateRange[1].year().toString();
            const fromDate = fromYear + '-' + fromMonth + '-' + fromDay
            const tillDate = toYear + '-' + toMonth + '-' + toDay
            if (handleAddress.match('^0x[a-fA-F0-9]{40}$')) {
                if (network === 'bitcoin') {
                    setnetworkAlert(true)
                } else {
                    let evmCurrencyLists: CurrencyTxnTypes[] = []
                    let inflowResult: TxnDetailTypes[] = [];
                    let outflowResult: TxnDetailTypes[] = [];
                    let ethBalance = 0;
                    let ethBalanceUSD = 0;
                    let totalTxn = 0;
                    let receivedTxn = 0;
                    let sentTxn = 0;
                    let receivedAmount = 0;
                    let sentAmount = 0;
                    const flowRaw = JSON.stringify({
                        "query": "query ($network: EthereumNetwork!, $address: String!, $from: ISO8601DateTime, $till: ISO8601DateTime, $limit: Int!, $offset: Int!) {\n  ethereum(network: $network) {\n    transfers(\n      date: {since: $from, till: $till}\n      amount: {gt: 0}\n      any: [{receiver: {is: $address}}, {sender: {is: $address}}]\n      options: {limit: $limit, offset: $offset, desc: [\"count_in\", \"count_out\"], asc: \"currency.symbol\"}\n    ) {\n      sum_in: amount(calculate: sum, receiver: {is: $address})\n      sum_in_usd: amount(in: USD, calculate: sum, receiver: {is: $address})\n      sum_out: amount(calculate: sum, sender: {is: $address})\n      sum_out_usd: amount(in: USD, calculate: sum, sender: {is: $address})\n      count_in: count(receiver: {is: $address})\n      count_out: count(sender: {is: $address})\n      currency {\n        address\n        symbol\n        tokenType\n      }\n    }\n  }\n}\n",
                        "variables": `{\n  \"limit\": 10,\n  \"offset\": 0,\n  \"network\": \"${network}\",\n  \"address\": \"${handleAddress}\",\n  \"from\": \"${fromDate}\",\n  \"till\": \"${tillDate}T23:59:59\",\n  \"dateFormat\": \"%Y-%m\"\n}`
                    });
                    const inTxnRaw = JSON.stringify({
                        "query": "query ($network: EthereumNetwork!, $address: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {\n  ethereum(network: $network) {\n    transfers(\n      options: {desc: \"block.timestamp.time\", asc: \"currency.symbol\", limit: $limit, offset: $offset}\n      date: {since: $from, till: $till}\n      amount: {gt: 0}\n      receiver: {is: $address}\n    ) {\n      block {\n        timestamp {\n          time(format: \"%Y-%m-%d %H:%M:%S\")\n        }\n        height\n      }\n      address: sender {\n        address\n        annotation\n      }\n      currency {\n        address\n        symbol\n      }\n      amount\n      amount_usd: amount(in: USD)\n      transaction {\n        hash\n      }\n      external\n    }\n  }\n}\n",
                        "variables": `{\n  \"limit\": 100,\n  \"offset\": 0,\n  \"network\": \"${network}\",\n  \"address\": \"${handleAddress}\",\n  \"from\": \"${fromDate}\",\n  \"till\": \"${tillDate}T23:59:59\",\n  \"dateFormat\": \"%Y-%m\"\n}`
                    });
                    const outTxnRaw = JSON.stringify({
                        "query": "query ($network: EthereumNetwork!, $address: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {\n  ethereum(network: $network) {\n    transfers(\n      options: {desc: \"block.timestamp.time\", asc: \"currency.symbol\", limit: $limit, offset: $offset}\n      date: {since: $from, till: $till}\n      amount: {gt: 0}\n      sender: {is: $address}\n    ) {\n      block {\n        timestamp {\n          time(format: \"%Y-%m-%d %H:%M:%S\")\n        }\n        height\n      }\n      address: receiver {\n        address\n        annotation\n      }\n      currency {\n        address\n        symbol\n      }\n      amount\n      amount_usd: amount(in: USD)\n      transaction {\n        hash\n      }\n      external\n    }\n  }\n}\n",
                        "variables": `{\n  \"limit\": 10,\n  \"offset\": 0,\n  \"network\": \"${network}\",\n  \"address\": \"${handleAddress}\",\n  \"currency\": \"\",\n  \"from\": \"${fromDate}\",\n  \"till\": \"${tillDate}T23:59:59\",\n  \"dateFormat\": \"%Y-%m\"\n}`
                    });
                    const ethBalanceRaw = JSON.stringify({
                        "query": "query ($network: EthereumNetwork!, $address: String!) {\n  ethereum(network: $network) {\n    address(address: {is: $address}) {\n      balances(currency: {is: \"ETH\"}) {\n        value\n      }\n    }\n  }\n}\n",
                        "variables": `{\n  \"limit\": 10,\n  \"offset\": 0,\n  \"network\": \"${network}\",\n  \"address\": \"${handleAddress}\"\n}`
                    });
                    const ethBalanceUSDRaw = JSON.stringify({
                        "query": "query ($network: EthereumNetwork!, $address: String!) {\n  ethereum(network: $network) {\n    address(address: {is: $address}) {\n      balances(currency: {is: \"ETH\"}) {\n        value(in: USD)\n      }\n    }\n  }\n}\n",
                        "variables": `{\n  \"limit\": 10,\n  \"offset\": 0,\n  \"network\": \"${network}\",\n  \"address\": \"${handleAddress}\"\n}`
                    });

                    const flowRequestOptions: RequestOptionsTypes = {
                        method: 'POST',
                        headers: myHeaders,
                        body: flowRaw,
                    };
                    const inTxnRequestOptions: RequestOptionsTypes = {
                        method: 'POST',
                        headers: myHeaders,
                        body: inTxnRaw
                    };
                    const outTxnRequestOptions: RequestOptionsTypes = {
                        method: 'POST',
                        headers: myHeaders,
                        body: outTxnRaw
                    };
                    const ethRequestOptions: RequestOptionsTypes = {
                        method: 'POST',
                        headers: myHeaders,
                        body: ethBalanceRaw
                    };
                    const ethUSDRequestOptions: RequestOptionsTypes = {
                        method: 'POST',
                        headers: myHeaders,
                        body: ethBalanceUSDRaw
                    };

                    await fetch("https://graphql.bitquery.io", flowRequestOptions)
                        .then(response => response.json())
                        .then(result => {
                            evmCurrencyLists = result.data.ethereum.transfers
                            setEvmCurrencyDetails(result.data.ethereum.transfers)
                        })
                        .catch(error => console.log('error', error));
                    await fetch("https://graphql.bitquery.io", inTxnRequestOptions)
                        .then(response => response.json())
                        .then(result => {
                            inflowResult = result.data.ethereum.transfers.map((txnDetail: any) => {
                                return { ...txnDetail, direction: 'inflow' }
                            })
                        })
                        .catch(error => console.log('error', error));
                    await fetch("https://graphql.bitquery.io", outTxnRequestOptions)
                        .then(response => response.json())
                        .then(result => {
                            outflowResult = result.data.ethereum.transfers.map((txnDetail: any) => {
                                return { ...txnDetail, direction: 'outflow' }
                            })
                        })
                        .catch(error => console.log('error', error));
                    await fetch("https://graphql.bitquery.io", ethRequestOptions)
                        .then(response => response.json())
                        .then(result => ethBalance = result.data.ethereum.address[0].balances[0].value)
                        .catch(error => console.log('error', error));
                    await fetch("https://graphql.bitquery.io", ethUSDRequestOptions)
                        .then(response => response.json())
                        .then(result => ethBalanceUSD = result.data.ethereum.address[0].balances[0].value)
                        .catch(error => console.log('error', error));

                    evmCurrencyLists.map((item) => {
                        receivedTxn += item.count_in
                        sentTxn += item.count_out
                        receivedAmount += item.sum_in_usd
                        sentAmount += item.sum_out_usd
                        totalTxn = receivedTxn + sentTxn
                    })
                    const concatResult = inflowResult.concat(outflowResult)
                    const txnResult = concatResult.sort((a, b) => {
                        return b.block.height - a.block.height
                    })
                    const summaryData = {
                        address: handleAddress,
                        ethBalance: ethBalance,
                        ethBalanceUSD: ethBalanceUSD,
                        totalTxn: totalTxn,
                        symbol: 'ETH',
                    }
                    const txnOverviewData = {
                        receivedTxn: receivedTxn,
                        sentTxn: sentTxn,
                        receivedAmount: receivedAmount,
                        sentAmount: sentAmount
                    }
                    setTxnOverviewList(txnOverviewData)
                    setSummaryList(summaryData)
                    setEVMTxnDetails(txnResult)
                }
            }
            else if (handleAddress.match('^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$')) {
                if (network !== 'bitcoin') {
                    setnetworkAlert(true)
                } else {
                    let inflowResult: BitcoinTxnDetailTypes[] = []
                    let outflowResult: BitcoinTxnDetailTypes[] = []

                    const flowRaw = JSON.stringify({
                        "query": "query ($network: BitcoinNetwork!, $address: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {\n  bitcoin(network: $network) {\n    inputs(date: {since: $from, till: $till}, inputAddress: {is: $address}) {\n      count\n      value\n      value_usd: value(in: USD)\n      min_date: minimum(of: date)\n      max_date: maximum(of: date)\n    }\n    outputs(date: {since: $from, till: $till}, outputAddress: {is: $address}) {\n      count\n      value\n      value_usd: value(in: USD)\n      min_date: minimum(of: date)\n      max_date: maximum(of: date)\n    }\n  }\n}\n",
                        "variables": `{\n  \"limit\": 10,\n  \"offset\": 0,\n  \"network\": \"${network}\",\n  \"address\": \"${handleAddress}\",\n  \"from\": \"${fromDate}\",\n  \"till\": \"${tillDate}T23:59:59\",\n  \"dateFormat\": \"%Y-%m-%d\"\n}`
                    });
                    const inTxnRaw = JSON.stringify({
                        "query": "query ($network: BitcoinNetwork!, $address: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {\n  bitcoin(network: $network) {\n    outputs(\n      date: {since: $from, till: $till}\n      outputAddress: {is: $address}\n      options: {desc: [\"block.height\", \"outputIndex\"], limit: $limit, offset: $offset}\n    ) {\n      block {\n        height\n        timestamp {\n          time(format: \"%Y-%m-%d %H:%M:%S\")\n        }\n      }\n      transaction {\n        hash\n      }\n      outputIndex\n      outputDirection\n      value\n      value_usd: value(in: USD)\n    }\n  }\n}\n",
                        "variables": `{\n  \"limit\": 100,\n  \"offset\": 10,\n  \"address\": \"${handleAddress}\",\n  \"network\": \"${network}\",\n  \"from\": \"${fromDate}\",\n  \"till\": \"${tillDate}T23:59:59\",\n  \"dateFormat\": \"%Y-%m\"\n}`
                    });
                    const outTxnRaw = JSON.stringify({
                        "query": "query ($network: BitcoinNetwork!, $address: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {\n  bitcoin(network: $network) {\n    inputs(\n      date: {since: $from, till: $till}\n      inputAddress: {is: $address}\n      options: {desc: [\"block.height\", \"transaction.index\"], limit: $limit, offset: $offset}\n    ) {\n      block {\n        height\n        timestamp {\n          time(format: \"%Y-%m-%d %H:%M:%S\")\n        }\n      }\n      outputTransaction {\n        hash\n        index\n      }\n      transaction {\n        hash\n        index\n      }\n      inputIndex\n      value\n      value_usd: value(in: USD)\n    }\n  }\n}\n",
                        "variables": `{\n  \"limit\": 10,\n  \"offset\": 0,\n  \"address\": \"${handleAddress}\",\n  \"network\": \"${network}\",\n  \"from\": \"${fromDate}\",\n  \"till\": \"${tillDate}T23:59:59\",\n  \"dateFormat\": \"%Y-%m\"\n}`
                    });

                    const flowRequestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: flowRaw,
                    };

                    const inTxnRequestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: inTxnRaw,
                    };

                    const outTxnRequestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: outTxnRaw,
                    };

                    await fetch("https://graphql.bitquery.io", flowRequestOptions)
                        .then(response => response.json())
                        .then(result => {
                            const dataList: BitcoinTxnTypes[] = [
                                { metric: 'Inputs in Transactions', value: result.data.bitcoin.inputs[0].count },
                                { metric: 'Outputs in Transactions', value: result.data.bitcoin.outputs[0].count },
                                { metric: 'First transaction date', value: result.data.bitcoin.outputs[0].min_date },
                                { metric: 'Last transaction date', value: result.data.bitcoin.outputs[0].max_date },
                                { metric: 'Received in Outputs', value: result.data.bitcoin.outputs[0].value },
                                { metric: 'Received in Outputs USD', value: `$${result.data.bitcoin.outputs[0].value_usd}` },
                                { metric: 'Spent to Inputs', value: result.data.bitcoin.inputs[0].value },
                                { metric: 'Spent to Inputs USD', value: `$${result.data.bitcoin.inputs[0].value_usd}` },
                                { metric: 'Balance ( unspent outputs )', value: result.data.bitcoin.outputs[0].value_usd },
                            ]
                            setBitcoinCurrencyDetails(dataList)
                        })
                        .catch(error => console.log('error', error));

                    await fetch("https://graphql.bitquery.io", inTxnRequestOptions)
                        .then(response => response.json())
                        .then(result => inflowResult = result.data.bitcoin.outputs.map((txnDetail: any) => {
                            return { ...txnDetail, direction: 'inflow' }
                        }))
                        .catch(error => console.log('error', error));

                    await fetch("https://graphql.bitquery.io", outTxnRequestOptions)
                        .then(response => response.json())
                        .then(result => outflowResult = result.data.bitcoin.outputs.map((txnDetail: any) => {
                            return { ...txnDetail, direction: 'inflow' }
                        }))
                        .catch(error => console.log('error', error));

                    const concatResult = inflowResult.concat(outflowResult)
                    const txnResult = concatResult.sort((a, b) => {
                        return b.block.height - a.block.height
                    })
                    setBitcoinTxnDetails(txnResult)
                }
            }
        }
        setIsShowDetails(true)
        setIsBackDrop(false)
    }
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && event.shiftKey) {
            return;
        } else if (event.key === 'Enter') {
            handleSearchAddress(searchAddress)
        }
    }
    const handleChangeNetwork = (event: SelectChangeEvent) => {
        setNetwork(event.target.value)
    }
    const handleBitcoinAddressAlertClose = () => {
        setnetworkAlert(false);
    };
    const handleSelectDateAlertClose = () => {
        setSelectDateAlert(false);
    };

    return (
        <ApexChartWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <TopFilterBar
                        handleChangeNetwork={handleChangeNetwork}
                        network={network}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        size='medium'
                        sx={{
                            '& .MuiOutlinedInput-root': { borderRadius: 4 },
                            width: '100%'
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <Magnify fontSize='medium' />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end' sx={{ cursor: 'pointer' }} onClick={() => handleSearchAddress(searchAddress)}>
                                    <Submit fontSize='medium' />
                                </InputAdornment>
                            )
                        }}
                        value={searchAddress}
                        onChange={(e) => setSearchAddress(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                        placeholder='Input your wallet address'
                    />
                </Grid>
                <Grid item xs={12}>
                    <CurrencyDetails
                        evmCurrencyDetails={evmCurrencyDetails}
                        bitcoinCurrencyDetails={bitcoinCurrencyDetails}
                        network={network}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    {isShowDetails && <Summary
                        summaryList={summaryList}
                    />}
                </Grid>
                <Grid item xs={12} md={6}>
                    {isShowDetails && <TransactionsOverview
                        txnOverviewList={txnOverviewList}
                    />}
                </Grid>
                <Grid item xs={12}>
                    <DetailsSection
                        evmTxnDetails={evmTxnDetails}
                        bitcoinTxnDetails={bitcoinTxnDetails}
                        network={network}
                    />
                </Grid>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={networkAlert}
                autoHideDuration={4000}
                onClose={handleBitcoinAddressAlertClose}
            >
                <Alert onClose={handleBitcoinAddressAlertClose} severity="warning" sx={{ width: '100%' }}>
                    Please select correct network!
                </Alert>
            </Snackbar>
            <Snackbar
                open={selectDateAlert}
                autoHideDuration={4000}
                onClose={handleSelectDateAlertClose}
            >
                <Alert onClose={handleSelectDateAlertClose} severity="warning" sx={{ width: '100%' }}>
                    Please select correct Date Range!
                </Alert>
            </Snackbar>
        </ApexChartWrapper>
    )
}

export default AddressSearch
