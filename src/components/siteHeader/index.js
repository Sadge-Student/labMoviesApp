import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Alert from "@mui/material/Alert";
import { ThemeToggle} from "../themeToggle";
import { useAuth } from "../../contexts/authContext";


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [error, setError] = useState('');
    const { currentUser, signout } = useAuth();
    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
      
    const handleClose = () => {
        setAnchorEl(null);
    };

    async function handleLogout() {
        setAnchorEl(null);
        setError('');

        try {
            await signout();
            navigate('/login');
            navigate(0);
        } catch {
            setError('Failed to log out.');
        }
    }

    const menuOptions = [
        { label: "Home", path: "/" },
        { label: "Favourites", path: "/movies/favourites" },
        { label: "Must Watch", path: "/movies/MyWatch" },
        { label: "Upcoming", path: "/movies/upcoming" },
        { label: "Popular", path: "/movies/popular" },
        { label: "Top Rated", path: "/movies/rated" },
        { label: "Actors", path: "/actors/" },
        { label: "Favourite Actors", path: "/actors/favourites"}
    ];

    const handleMenuSelect = (pageURL) => {
        navigate(pageURL, { replace: true });
    };    

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <AppBar position="fixed" color="secondary">
                <ToolBar>
                    <Typography variant="h4" sx={{ flexGrow: 1}}>
                        TMDB Client
                    </Typography>
                    {/* <Typography variant="h6" sx={{ flexGrow: 1}}>
                        All you ever wanted to know about Movies!
                    </Typography> */}
                    {isMobile ? (
                        <>
                            <IconButton
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                 }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuOptions.map((opt) => (
                                    <MenuItem
                                        key={opt.label}
                                        onClick={() => handleMenuSelect(opt.path)}
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    ) : (
                        <>
                        {currentUser !== null &&
                        <>
                            {menuOptions.map((opt) => (
                                <Button
                                    key={opt.label}
                                    color="inherit"
                                    onClick={() => handleMenuSelect(opt.path)}
                                >
                                    {opt.label}
                                </Button>
                            ))}
                        </>
                        }
                        </>
                    )}
                    <ThemeToggle />
                    
                    {error && <Alert severity="error">{error}</Alert>}
                    
                    {currentUser !== null && 
                        <div>
                        <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        color="inherit"
                        >
                        {currentUser.email}
                        </Button>
                        <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                    }
                    
                    {currentUser === null &&
                    <>
                        <Button key="signin" color="inherit" href="/login">
                            Sign In
                        </Button>

                        <Button key="register" color="inherit" href="/signup">
                            Register
                        </Button>
                    </>
                    }
                </ToolBar>
            </AppBar>
            <Offset />
        </>
    );
};
export default SiteHeader;