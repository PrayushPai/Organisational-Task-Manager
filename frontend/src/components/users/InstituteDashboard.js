import axios from "axios";
import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Chart from "./chart";
import "./styles.css";

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

const Card = (props) => {
  return (
    <>
      {props.data.map((item) => (
        <>
          <li className="card">
            {item.name}
            {item.children?.length && <Card data={item.children} />}
          </li>
        </>
      ))}
    </>
  );
};

const InstituteDashboard = (props) => {
  const [name, setName] = useState("");
  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClick = () => {
    setOpen2(!open2);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (event) => {
    setOpen(false);

    const role = {
      role: name
    };

    console.log(role);
    event.preventDefault();
    const instituteId = sessionStorage.getItem('instituteId');
    console.log(instituteId);

    const link = "http://localhost:4000/addRole/" + instituteId;
    console.log(link);
    console.log(sessionStorage.getItem('token'));

    axios
      .put(link, role, {
        headers: {
          'access-token': sessionStorage.getItem('token'),
        }
      })
      .then((response) => {
        alert("Added role successfully");
        console.log(response.data);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Chart />
      </div>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 32,
          pb: 12,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            User Hierarchy
          </Typography>

          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" onClick={handleClickOpen} >Add level</Button>
            <Dialog open={open} onClose={handleClose}

              fullWidth={fullWidth}
            >
              <DialogTitle>ADD LEVEL</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="ROLE NAME"
                  type="name"
                  fullWidth
                  variant="standard"
                  onChange={onChangeName}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={onSubmit}>CONFIRM</Button>
              </DialogActions>
            </Dialog>
          </Stack>
        </Container>
      </Box >
    </ThemeProvider>
  );
};

export default InstituteDashboard;
