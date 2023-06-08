import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect } from "react";
import { Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";

const theme = createTheme();

const BreakdownTask = (props) => {

    let taskID = sessionStorage.getItem("task_id");
    let userID = sessionStorage.getItem("user_id");

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [assigned_user, setAssignedUser] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const onChangeAssignedUser = (event) => {
        setAssignedUser(event.target.value);
    };

    const onChangeDescription = (event) => {
        setDescription(event.target.value);
    };

    const onChangeDeadline = (event) => {
        setDeadline(event.target.value);
    };

    const resetBreakdownInputs = () => {
        setName("");
        setAssignedUser("");
        setDescription("");
        setDeadline("");
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const child_task = {
            name: name,
            user_id: assigned_user,
            parent_task_id: taskID,
            description: description,
            deadline: deadline,
        };
        console.log("child task");
        console.log(child_task);

        axios
            .post("http://localhost:4000/task/", child_task, {
                headers: {
                    'access-token': sessionStorage.getItem('token'),
                }
            })
            .then((res) => console.log(res.data));

        resetBreakdownInputs();
        navigate("/user/tasks");
    };

    const [children, setChildren] = useState([]);

    useEffect(() => {
        const user = {
            id: parseInt(userID),
        }

        axios
            .post("http://localhost:4000/user/getChildren", user, {
                headers: {
                    'access-token': sessionStorage.getItem('token'),
                }
            })
            .then((response) => {
                console.log(response.data);
                setChildren(response.data);
            });
    }, []);

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
                        mt: 1
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Task Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={onChangeName}
                        />

                        <Box sx={{ mb: 2 }}></Box>

                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Assign to user</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                sx={{ "& .MuiSvgIcon-root": { fontSize: "1.5em" } }}
                                value={assigned_user}
                                onChange={onChangeAssignedUser}

                            >
                                <Box sx={{ mb: 2 }}></Box>

                                {children.map((child) => (
                                    <FormControlLabel value={child.id} control={<Radio />} label={child.name} />
                                ))}

                            </RadioGroup>
                        </FormControl>

                        {/* <Select value={assigned_user} onChange={onChangeAssignedUser}
                            sx={{
                                mt: 1,
                                width: '100%',
                                minWidth: '200px',
                                position: 'relative',
                                left: 0,
                                top: 0,
                                style: { width: '300px' }
                            }}
                        >
                            <MenuItem value="">Assign to user</MenuItem>
                            {children.map((child) => (
                                <MenuItem key={child.id} value={child.id}>
                                    {child.name}(ID: {child.id})
                                </MenuItem>

                            ))}
                        </Select> */}

                        {/* <Box sx={{ mb: 2 }}></Box> */}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            autoComplete="description"
                            autoFocus
                            value={description}
                            onChange={onChangeDescription}
                        />
                        <TextField

                            margin="normal"
                            required
                            fullWidth
                            id="deadline"
                            label="Deadline"
                            name="deadline"
                            autoComplete="deadline"
                            autoFocus
                            value={deadline}
                            onChange={onChangeDeadline}
                        />
                        <br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default BreakdownTask;
