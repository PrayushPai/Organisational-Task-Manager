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
import { Divider, Typography } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useState, useEffect } from "react";


const theme = createTheme();

const ReviewTask = (props) => {
    let taskID = sessionStorage.getItem("task_id");
    let userID = sessionStorage.getItem("user_id");

    const navigate = useNavigate();

    const [comments, setComments] = useState("");

    const onChangeComments = (event) => {
        setComments(event.target.value);
    };

    const [accepted, setAccepted] = useState("");

    const onChangeAccepted = (event) => {
        setAccepted(event.target.value);
    };

    const resetReviewInputs = () => {
        setComments("");
        setAccepted("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let acc = 0;
        if (accepted)
            acc = 1;
        else
            acc = -1;

        const review = {
            id: taskID,
            comment: comments,
            reviewed: acc,
        };

        console.log(review);

        axios
            .post("http://localhost:4000/task/review", review, {
                headers: {
                    'access-token': sessionStorage.getItem('token'),
                }
            })
            .then((res) => console.log(res.data));

        resetReviewInputs();
        navigate("/user/tasks")
    };


    const [submission, setSubmission] = useState([]);

    useEffect(() => {
        const task = {
            id: parseInt(taskID),
        };
        axios
            .post("http://localhost:4000/task/byId", task, {
                headers: {
                    'access-token': sessionStorage.getItem('token'),
                }
            })
            .then((response) => {
                console.log(response.data);
                setSubmission(response.data.submission);
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
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mb: 4 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Submission: {submission}
                        </Typography>
                        <FormControl fullWidth sx={{ mt: 4 }}>
                            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ my: 2 }}>Accepted</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={accepted}
                                onChange={onChangeAccepted}
                                sx={{ "& .MuiSvgIcon-root": { fontSize: "2.0em" } }}

                            >
                                <FormControlLabel value={true} control={<Radio />} label="Yes" sx={{ margin: '0 1rem' }} />
                                <FormControlLabel value={false} control={<Radio />} label="No" sx={{ margin: '0 1rem' }} />
                            </RadioGroup>
                        </FormControl>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="comments"
                            onChange={onChangeComments}
                            value={comments}
                            label="Comments"
                            name="comments"
                            autoComplete="comments"
                            autoFocus
                        />
                        <Divider></Divider>
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
        </ThemeProvider >
    );
};

export default ReviewTask;
