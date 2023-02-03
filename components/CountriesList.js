import * as React from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Container, Stack } from '@mui/system';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import axios from "axios"

const CountriesList = () => {
    const [counteries, setCountries] = useState([])

    useEffect(() => {
        const getCountries = async () => {
            const res = await axios.get(`https://restcountries.com/v2/all`)
            setCountries(res.data)
        }
        getCountries()
    }, [])


    const [value, setValue] = useState("")
    const [countryName, setCountryName] = useState("")

    const regions = [
        { title: 'Africa' },
        { title: 'Americas' },
        { title: 'Asia' },
        { title: 'Europe' },
        { title: 'Oceania' },
    ];


    const defaultProps = {
        options: regions,
        getOptionLabel: (option) => option.title,
        isOptionEqualToValue: (option, value) => option.title === value.title

    };

    const handleFilterCountries = async (continent) => {
        const res = await axios.get(`https://restcountries.com/v2/region/${continent.title}`)
        setCountries(res.data)
    }

    const searchCountry = async (e) => {
        e.preventDefault()
        const res = await axios.get(`https://restcountries.com/v2/name/${countryName}`)
        setCountries(res.data)
    }
    console.log(counteries)

    return (<>
        <Container sx={{ my: 4 }}>
            <Stack

                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="center"
            >
                <form onSubmit={(e) => searchCountry(e)}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            placeholder='Search for a countery'

                            endAdornment={<InputAdornment position="end"> <SearchIcon /></InputAdornment>}
                            sx={{
                                width: {

                                    sm: "400px",
                                    md: "500px"
                                }
                            }}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            onChange={(e) => setCountryName(e.target.value)}
                            value={countryName}
                        />
                    </FormControl>
                </form>
                <Autocomplete
                    {...defaultProps}
                    sx={{
                        width: {
                            xs: "225px",
                        }
                    }}
                    id="controlled-demo"

                    value={value || null}
                    onChange={(event, newValue) => {
                        setValue(newValue),
                            handleFilterCountries(newValue)
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Filter By Region" variant="outlined" />
                    )}
                />
            </Stack>
        </Container>

    </>)
}
export default CountriesList