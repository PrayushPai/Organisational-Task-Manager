
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

const ChildrenTask = (props) => {

    const navigate = useNavigate();
    let parent_task_id = sessionStorage.getItem("task_id");

    const [tasks, setTasks] = useState([]);
    const [cards, setCards] = useState([]);

    const onChangeTasks = (event) => {
        setTasks(event.target.value);
    };

    const onChangeCards = (event) => {
        setCards(event.target.value);
    };

    useEffect(() => {
        const task = {
            id: parent_task_id,
        }
        console.log(task);
        axios
            .post("http://localhost:4000/task/getChildren", task, {
                headers: {
                    'access-token': sessionStorage.getItem('token'),
                }
            })
            .then((response) => {
                setTasks(response.data);
            });

        const n = tasks.length;
        setCards(Array(n).fill().map((_, index) => index + 1));

    }, [tasks.length]);

    console.log(tasks);
    console.log(cards);

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
                            Child Tasks
                        </Typography>

                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
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
                                                    {/* <Typography variant="caption"> */}
                                                    {/* Progress {tasks[card - 1].progress} % */}
                                                    {/* </Typography> */}
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
                                                sessionStorage.setItem("task_id", tasks[card - 1].id);
                                                navigate("/user/tasks/review")
                                            }}>Review</Button>

                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                    </Container>
                    <Divider />

                </main>
            </main>
        </ThemeProvider>
    );
};

export default ChildrenTask;
