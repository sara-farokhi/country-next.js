import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';


const NavBar = ({ setMode, mode }) => {
    const changeMode = () => {
        setMode(mode === "light" ? "dark" : "light")
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='transparent'>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Where in the word
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={changeMode}
                        >
                            {
                                mode === "dark" ? (
                                    <>
                                        <LightModeIcon />
                                        <Box sx={{ fontSize: "13px", ml: 1 }}
                                        >Light Mode</Box>
                                    </>
                                ) : (
                                    <>
                                        <DarkModeOutlinedIcon />
                                        <Box sx={{ fontSize: "13px", ml: 1 }}
                                        > Dark Mode</Box>
                                    </>
                                )
                            }
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </>)
}

export default NavBar