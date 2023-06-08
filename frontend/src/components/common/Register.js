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
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { useEffect } from "react";

// import { password } from "../../../../backend/app/config/db.config";

const theme = createTheme();

const Register_user = (props) => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [instituteId, setInstituteId] = useState("");
  const [role, setRole] = useState("");
  const [parentId, setParentId] = useState("");
  const [roles, setRoles] = useState([]);


  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeInstituteId = (event) => {
    setInstituteId(event.target.value);

  };

  const onChangeRole = (event) => {
    setRole(event.target.value);
  };

  const onChangeParentId = (event) => {
    setParentId(event.target.value);
  };

  const resetInputs = () => {

    setName("");
    setPassword("");
    setInstituteId("");
    setRole("");
    setParentId("");

  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      password: password,
      instituteName: instituteId,
      role: selectedRole,
      parentId: parentId,
    };

    axios
      .post("http://localhost:4000/user/", newUser)
      .then((response) => {
        alert("Registered Successfully");
        console.log(response.data);
        window.location.href = "/login";
      });

    resetInputs();
  };

  useEffect(() => {
    // Fetch roles based on the instituteId
    if (instituteId) {
      const ins = {
        name: instituteId
      };

      console.log(ins);
      sessionStorage.setItem('instituteId', instituteId);

      axios
        .post('http://localhost:4000/institute/getRoles', ins)
        .then((response) => {
          console.log(response.data.roles);
          setRoles(response.data.roles);
          console.log(roles);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [instituteId]);

  const [selectedRole, setSelectedRole] = useState("");

  const handleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={onChangeName}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="institutenId"
            label="Institute Name"
            name="instituteId"
            autoComplete="instituteName"
            autoFocus
            value={instituteId}
            onChange={onChangeInstituteId}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="parentid"
            label="Parent ID"
            name="parentid"
            autoComplete="parentid"
            autoFocus
            value={parentId}
            onChange={onChangeParentId}
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
            value={password}
            onChange={onChangePassword}
          />

          <Select value={selectedRole} onChange={handleChange}
            sx={{
              mt: 1, // adjust top margin as needed
              width: '100%', // make the select full width
              minWidth: '200px', // set a minimum width
              position: 'relative', // set position to relative
              left: 0, // adjust horizontal position as needed
              top: 0, // adjust vertical position as needed
            }}

          >
            <MenuItem value="">Select a role</MenuItem>
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>

            ))}
          </Select>
          <Box sx={{ mb: 2 }}></Box>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit}>
              Register
            </Button>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider >
  );
};

const Register_institute = (props) => {

  const [instituteName, setInstituteName] = useState("");
  const [institutePassword, setInstitutePassword] = useState("");

  const onChangeInstituteName = (event) => {
    setInstituteName(event.target.value);
  };

  const onChangeInstitutePassword = (event) => {
    setInstitutePassword(event.target.value);
  };

  const resetInputs = () => {
    setInstituteName("");
    setInstitutePassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("in here");

    const newInstitute = {
      name: instituteName,
      password: institutePassword,
    };
    console.log("reached");
    console.log(newInstitute)

    axios
      .post("http://localhost:4000/institute", newInstitute)
      .then((response) => {
        alert("Registered " + newInstitute.name);
        console.log(response.data);
        window.location.href = "/login";
      }).catch((error) => {
        alert("Error" + error);
      });

    resetInputs();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="institutename"
            label="Institute Name"
            name="institutename"
            autoComplete="institutename"
            autoFocus
            value={instituteName}
            onChange={onChangeInstituteName}
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
            value={institutePassword}
            onChange={onChangeInstitutePassword}
          />
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit}>
              Register
            </Button>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );

};

const Register = (props) => {
  const [user, setUser] = useState('');

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12} align={"center"}>
        <FormControl sx={{ m: 1, minWidth: 380 }}>
          <InputLabel id="simple-select-label">USER</InputLabel>
          <Select
            labelId="simple-select-label"
            id="demo-simple-select"
            value={user}
            label="USER"
            onChange={handleChange}
          >
            <MenuItem value={0}>User</MenuItem>
            <MenuItem value={1}>Institute</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {user === 0 && <Register_user />}
      {user === 1 && <Register_institute />}
    </Grid>
  );
};

export default Register;