import { Box, Button, Grid, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import axios from "axios";

const Country = ({ country }) => {
    return (<>
        <Container>
            <Link href="/">
                <Button sx={{ my: 8 }} variant="outlined" startIcon={<ArrowBackIcon />}>
                    Back
                </Button>
            </Link>
            <Grid container>
                <Grid item xs={12} sm={6} sx={{ pr: 5 }}>
                    {/* <Image src={country.flag} width={300} height={400} /> */}
                    <img src={country.flag} style={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ pl: 6 }}>
                    <Typography gutterBottom variant="h5" sx={{ my: 4 }} component="div">
                        {country.name}
                    </Typography>
                    <Stack direction="column">
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 3, sm: 16 }}
                        >
                            <Box>
                                <Stack direction="row" spacing={1} mb={1}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}> Native Name : </Typography>
                                    <Typography variant="body2" color="text.secondary" >{country.nativeName}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} mb={1}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}> Population : </Typography>
                                    <Typography variant="body2" color="text.secondary" >{country.population}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} mb={1}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}> Region : </Typography>
                                    <Typography variant="body2" color="text.secondary" >{country.region}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} mb={1}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Sub Region : </Typography>
                                    <Typography variant="body2" color="text.secondary" >{country.subregion}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} mb={1}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Capital : </Typography>
                                    <Typography variant="body2" color="text.secondary" >{country.capital}</Typography>
                                </Stack>
                            </Box>
                            <Box >
                                <Stack direction="row" spacing={1} mb={1}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}> Top Level Domain : </Typography>
                                    <Typography variant="body2" color="text.secondary" >{country.topLevelDomain.join(",")}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} mb={1}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Currencies : </Typography>
                                    <Typography variant="body2" color="text.secondary" >{country.currencies && country.currencies.map((currency, i) => <span key={i}>{currency.name}</span>)}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} mb={1}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Languages : </Typography>
                                    <Typography variant="body2" color="text.secondary" >{country.currencies && country.languages.map((lang, i) => <span key={i}>{lang.name}</span>)}</Typography>
                                </Stack></Box>

                        </Stack>
                        <Box>
                            <Stack direction="row" spacing={1} mb={1}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Border Countries : </Typography>
                                {country.borders ? country.borders
                                    .map((border, i) => <Link key={i} href={`/country/${border.toLowerCase()}`} > <Button variant="outlined" key={i}>{border}</Button></Link>) : " ---"}
                            </Stack>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Container >
    </>)

}
export default Country
export async function getServerSideProps({ query }) {


    try {
        const res = await axios.get(`https://restcountries.com/v2/alpha/${query.name}`)
        return {
            props: {
                country: res.data,
            }
        }
    }
    catch (error) {
        return {
            props: {
                err: ""
            }
        }
    }
}