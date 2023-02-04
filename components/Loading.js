import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loaing = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "450px", width: 1 }}>
            <CircularProgress />
        </Box>
    );
}
export default Loaing