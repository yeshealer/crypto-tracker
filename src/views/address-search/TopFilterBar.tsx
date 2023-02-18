// ** React Import
import React from 'react'

// ** Material UI Imports
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import TextField from '@mui/material/TextField'

// ** Third Party
import { Dayjs } from 'dayjs';

interface TopFilterBarProps {
    handleChangeNetwork: (event: SelectChangeEvent) => void;
    network: string;
    dateRange: DateRange<Dayjs>;
    setDateRange: (dateRange: DateRange<Dayjs>) => void;
}

export default function TopFilterBar({
    handleChangeNetwork,
    network,
    dateRange,
    setDateRange
}: TopFilterBarProps) {
    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={{ start: 'Start Date', end: 'End Date' }}
            >
                <DateRangePicker
                    calendars={2}
                    value={dateRange}
                    onChange={(newValue: any) => {
                        setDateRange(newValue);
                    }}
                    renderInput={(startProps: any, endProps: any) => (
                        <React.Fragment>
                            <TextField {...startProps} size='small' />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField {...endProps} size='small' />
                        </React.Fragment>
                    )}
                />
            </LocalizationProvider>
            <FormControl size='small' sx={{ minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Select Network</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={network}
                    label="Select Network"
                    onChange={handleChangeNetwork}
                >
                    <MenuItem value='bitcoin'>Bitcoin</MenuItem>
                    <MenuItem value='ethereum'>Ethereum</MenuItem>
                    <MenuItem value='bsc'>Binance</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
