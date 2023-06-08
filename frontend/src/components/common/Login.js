import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { Component } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CommonModule } from '@angular/common';

const theme = createTheme();

const Login_user = (props) => {

    //user = 0 for user
    //user = 1 for institute

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
        setEmail("");
        setPassword("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            name: email,
            password: password
        };

        axios
            .post("http://localhost:4000/user/login", newUser)
            .then((response) => {
                alert("Logged in " + email);
                console.log(response.data);
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("usertype", "U");
                sessionStorage.setItem("user_id", response.data.data.id);
                window.location.href = "/";
            });
        resetInputs();
    };

    return (
        <ThemeProvider theme={theme}>
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            onChange={onChangeEmail}
                            value={email}
                            label="User name"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            onChange={onChangePassword}
                            label="Password"
                            type="password"
                            value={password}
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
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

const Login_institute = (props) => {

    const [name, setName] = useState("");
    const [ipassword, setIpassword] = useState("");

    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const onChangeIpassword = (event) => {
        setIpassword(event.target.value);
    };

    const resetInputs = () => {
        setName("");
        setIpassword("");
    };

    const handleSubmit = (event) => {

        console.log("hi");
        event.preventDefault();

        const newInstitute = {
            name: name,
            password: ipassword
        };


        console.log(newInstitute);

        axios
            .post("http://localhost:4000/institute/login", newInstitute)
            .then((response) => {
                alert("Logged in " + name);
                console.log(response.data);
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("usertype", "I");
                sessionStorage.setItem('instituteId', response.data.data.id);
                window.location.href = "/";
            });

        resetInputs();
    };

    return (
        <ThemeProvider theme={theme}>
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Institute name"
                            name="name"
                            onChange={onChangeName}
                            value={name}
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            onChange={onChangeIpassword}
                            label="Password"
                            type="password"
                            id="password"
                            value={ipassword}
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
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );

};

const Login = (props) => {

    const [user, setUser] = useState('');
    const onChangeUser_type = (event) => {
        setUser(event.target.value);
    };

    const handleChange = (event) => {
        setUser(event.target.value);
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12} align={"center"}>
                <FormControl sx={{ m: 1, minWidth: 380 }}>
                    <InputLabel id="simple-select-label">ROLE</InputLabel>
                    <Select
                        variant="outlined"

                        labelId="simple-select-label"
                        id="demo-simple-select"
                        value={user}
                        label="USER"
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>USER</MenuItem>
                        <MenuItem value={1}>INSTITUTE</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {user === 0 && <Login_user />}
            {user === 1 && <Login_institute />}
        </Grid >
    );
};
export default Login;
