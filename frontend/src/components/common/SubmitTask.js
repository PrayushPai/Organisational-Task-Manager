import { useState } from "react";
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

const theme = createTheme();

const SubmitTask = (props) => {
    let taskID = sessionStorage.getItem("task_id");
    let userID = sessionStorage.getItem("user_id");

    const navigate = useNavigate();

    const [submission, setSubmission] = useState("");
    const onChangeSubmission = (event) => {
        setSubmission(event.target.value);
    };

    const resetSubmsissionInputs = () => {
        setSubmission("");
    };

    const handleSubmit = (event, id) => {
        event.preventDefault();
        const sub = {
            id: taskID,
            submission: submission,
        };
        console.log(sub);

        axios
            .post("http://localhost:4000/task/submit", sub, {
                headers: {
                    'access-token': sessionStorage.getItem('token'),
                }
            })
            .then((res) => console.log(res.data));

        resetSubmsissionInputs();
        navigate("/user/tasks")

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
                            id="submission"
                            onChange={onChangeSubmission}
                            value={submission}
                            label="Submission"
                            name="submission"
                            autoComplete="submission"
                            autoFocus
                        />
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

export default SubmitTask;
