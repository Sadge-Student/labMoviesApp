import React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Tooltip from "@mui/material/Tooltip";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const setThemeInStorage = (theme) => {
  localStorage.setItem('theme', theme);
  return theme;
}


function ThemeToggle() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '4%',
        alignItems: 'center',
        justifyContent: 'center',
        // bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 1,
      }}
    >
      {/* {theme.palette.mode} mode */}
      <Tooltip title="Theme Changer" placement="bottom" arrow>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === localStorage.getItem('theme') ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}

function ToggleColorMode({children}) {
  if (localStorage.getItem('theme') === null) {
    setThemeInStorage('dark');
  }
  const [mode, setMode] = React.useState(localStorage.getItem('theme'));
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? setThemeInStorage('dark') : setThemeInStorage('light')));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export {ThemeToggle, ToggleColorMode}