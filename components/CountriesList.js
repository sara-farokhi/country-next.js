import * as React from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Container, Stack } from '@mui/system';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect, useMemo } from 'react';
import axios from "axios"
import { Box, Grid, Card } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, ButtonGroup, Button } from '@mui/material';
import Loading from './Loading';



const CountriesList = () => {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)

    const getCountries = async () => {
        setLoading(true)
        const res = await axios.get(`https://restcountries.com/v2/all`)
        setCountries(res.data)
        setLoading(false)
    }

    useEffect(() => {
        getCountries()

    }, [])


    const [value, setValue] = useState("")
    const [order, setOrder] = useState("acc")
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
        setLoading(true)
        if (continent) {
            const res = await axios.get(`https://restcountries.com/v2/region/${continent.title}`)
            setCountries(res.data)
        }
        setLoading(false)
    }

    const searchCountry = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await axios.get(`https://restcountries.com/v2/name/${countryName}`)
        setCountries(res.data)
        setLoading(false)
    }


    const sortByName = async () => {
        setLoading(true)
        let A = [...countries]
        A.sort((a, b) => {
            const capitalA = a.name// ignore upper and lowercase
            const capitalB = b.name // ignore upper and lowercase
            if (capitalA < capitalB) {
                return -1;
            }
            if (capitalA > capitalB) {
                return 1;
            }

            return 0;
        });
        setCountries(A)
        setLoading(false)
    }

    const sortByPopulation = async () => {
        let A = [...countries]
        if (order == "acc") {
            setLoading(true)
            A.sort((a, b) => a.population - b.population)
            setCountries(A)
            setOrder("dec")
            setLoading(false)
        }
        else {
            setLoading(true)
            A.sort((a, b) => b.population - a.population)
            setCountries(A)
            setOrder("acc")
            setLoading(false)
        }
    }

    const countryList = useMemo(() => {
        return (
            <Grid container sx={{ my: 6, spacing: 2 }}>
                {countries && countries.map((country, i) => (<Grid key={i} item sm={6} md={3} sx={{ p: 2, width: 1 }}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={country.flag}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {country.name}
                                </Typography>

                                <Stack direction="row" spacing={1}>

                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}> Population : </Typography>

                                    <Typography variant="body2" color="text.secondary" >{country.population}</Typography>

                                </Stack>
                                <Stack direction="row" spacing={1}>

                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}> Capital : </Typography>

                                    <Typography variant="body2" color="text.secondary" >{country.capital}</Typography>

                                </Stack>
                                <Stack direction="row" spacing={1}>

                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}> Population : </Typography>

                                    <Typography variant="body2" color="text.secondary" >{country.population}</Typography>

                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>))}
            </Grid>
        )
    }, [countries])










    return (<>
        <Container sx={{ my: 4 }}>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={4}
                justifyContent="space-between"
                alignItems="center"
            >
                <Box>
                    <form onSubmit={(e) => searchCountry(e)}>
                        <FormControl variant="outlined">
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
                                onChange={(e) => setCountryName(e.target.value)
                                }
                                value={countryName}
                            />
                        </FormControl>
                    </form>
                </Box>


                <Box >
                    <ButtonGroup variant="text" aria-label="text button group">
                        <Button onClick={() => getCountries()}>All Countreis</Button>
                        <Button onClick={() => sortByName()}>Sort by Name</Button>
                        <Button onClick={() => sortByPopulation()}>Sort by Population</Button>
                    </ButtonGroup>
                </Box>


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
            {loading ? <Loading /> : countryList}
        </Container>
    </>)
}
export default CountriesList

