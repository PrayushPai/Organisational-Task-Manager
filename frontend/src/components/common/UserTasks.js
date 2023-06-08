
import axios from "axios";
import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Grid, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButton from '@mui/material/ToggleButton';
import CheckIcon from '@material-ui/icons/Check';
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function UserTasks() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [name, setName] = useState("");
    const [taskID, setTaskID] = useState("");


    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const onChangeTaskID = (event) => {
        setTaskID(event.target.value);
    };

    const onChangeDescription = (event) => {
        setDescription(event.target.value);
    };

    const onChangeDeadline = (event) => {
        setDeadline(event.target.value);
    };

    const resetInputs = () => {
        setName("");
        setDescription("");
        setDeadline("");
    };

    const onCreate = (event) => {
        event.preventDefault();
        const task = {
            name: name,
            user_id: sessionStorage.getItem("user_id"),
            parent_task_id: null,
            description: description,
            deadline: deadline,
        };
        console.log(task);

        axios
            .post("http://localhost:4000/task/", task, {
                headers: {
                    'access-token': sessionStorage.getItem('token'),
                }
            })
            .then((res) => console.log(res.data));

        resetInputs();
        handleClose();
    };

    const [tasks, setTasks] = useState([]);
    const [cards, setCards] = useState([]);

    const onChangeTasks = (event) => {
        setTasks(event.target.value);
    };
    const onChangeCards = (event) => {
        setCards(event.target.value);
    };

    useEffect(() => {
        let id = parseInt(sessionStorage.getItem("user_id"));
        const user = {
            id: id,
        };
        console.log(user);

        axios
            .post("http://localhost:4000/task/byUserId/", user, {
                headers: {
                    'access-token': sessionStorage.getItem('token'),
                }
            })
            .then((response) => {
                console.log(response.data);
                setTasks(response.data);
            });

        const n = tasks.length;
        setCards(Array(n).fill().map((_, index) => index + 1));
        console.log(cards);

    }, [tasks.length]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
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
                            My Tasks
                        </Typography>

                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Create Task
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Create Task</DialogTitle>
                                <DialogContent>

                                    <Box component="form" noValidate sx={{ mt: 1 }}>
                                        <TextField margin="normal" required fullWidth id="name" label="Name" name="name" autoComplete="name" autoFocus onChange={onChangeName} value={name} />
                                        <TextField margin="normal" required fullWidth id="description" label="Description" name="description" autoComplete="description" autoFocus onChange={onChangeDescription} value={description} />
                                        <TextField margin="normal" required fullWidth id="deadline" label="Deadline" name="deadline" autoComplete="deadline" autoFocus onChange={onChangeDeadline} value={deadline} />
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    {/* make the submit button that save and closes the dialog */}
                                    <Button onClick={onCreate}>Create</Button>

                                </DialogActions>
                            </Dialog>

                            <Divider />
                        </Stack>
                    </Container>
                </Box>
                <main>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Grid container spacing={4}>
                            {cards.map((card) => (
                                <Grid item key={card} xs={12} sm={6} md={16}>
                                    <Card
                                        sx={{
                                            height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' // add position: relative to the card
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', marginRight: 1 }}>
                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Typography variant="caption">
                                                        Progress {tasks[card - 1].progress} %
                                                    </Typography>
                                                    <CircularProgress variant="determinate" value={tasks[card - 1].progress} />
                                                </Box>
                                            </Box>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {tasks[card - 1].name}
                                            </Typography>
                                            <Typography>
                                                {tasks[card - 1].description}
                                            </Typography>
                                            <Typography>
                                                Deadline: <strong>{new Date(tasks[card - 1].deadline).toDateString()}</strong>
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" onClick={() => {
                                                // handleOpenSubmissionDialog();
                                                sessionStorage.setItem("task_id", tasks[card - 1].id);
                                                navigate("submit")
                                            }}>Submit</Button>

                                            {/* <Button size="small" onClick={() => {
                                                sessionStorage.setItem("task_id", tasks[card - 1].id);
                                                navigate("review")
                                            }}>Review</Button> */}

                                            <Button size="small" onClick={() => {
                                                sessionStorage.setItem("task_id", tasks[card - 1].id);
                                                navigate("breakdown")
                                            }}>Breakdown and assign</Button>

                                            <Button size="small" onClick={() => {
                                                sessionStorage.setItem("task_id", tasks[card - 1].id);
                                                navigate("children")
                                            }}>Child Tasks</Button>

                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
            </main>
        </ThemeProvider>
    );
}