import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        MovieApp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
    const { signin, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
        setError('');
        setLoading(true);
        await signin(data.get('email'), data.get('password'));
        navigate("/");
      } catch(e) {
        setError("Login Failed.");
      };
      setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
        sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

        {
            error && 
            <Grid item xs={12}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            </Grid>
        }

        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
        />
        <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
        >
            Sign In
        </Button>
        <Grid container>
            <Grid item xs>
            <Link href="#" variant="body2">
                Forgot password?
            </Link>
            </Grid>
            <Grid item>
            <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
            </Link>
            </Grid>
        </Grid>
        </Box>
    </Box>
    <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}