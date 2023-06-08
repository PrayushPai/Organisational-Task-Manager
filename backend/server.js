const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const bcrypt = require('bcrypt');

const app = express();

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hi There')
});

const { verifyToken } = require('./app/auth/auth.js');

const institute = require("./app/controllers/institute.controller.js");
app.get('/institute/', institute.findAll); // get all institutes
app.post('/institute/', institute.create); // create a new institute (takes name and password)
app.post('/institute/login', institute.login); // return institute if login is successful (takes name and password)
app.post('/institute/getRoles', institute.getRoles); // get all roles of an institute (takes name)
// iske niche query mat likho
app.get('/institute/:id', institute.findOne); // return institute (takes id)
app.put('/institute/:id', institute.update); // update institute (takes id)
app.put('/addRole/:id', verifyToken, institute.addRole); // add role to institute (takes id)

const user = require("./app/controllers/user.controller.js");
app.post('/user/', user.create); // create a new user (takes name, password, instituteId, role, parentId)
app.post('/user/login', user.login); // return user if login is successful (takes name and password)
app.get('/user/delete/:id', user.delete); // delete user (takes id)
app.post('/user/getChildren', verifyToken, user.getChildren); // get children of a user (takes id)
// app.get('/user/:instituteId', user.findAll); // get all users of an institute (takes instituteId)
app.post('/heirarchy/', verifyToken, user.heirarchy); // get hierarchy of an institute (takes instituteId)
app.get('/user/:id', user.findOne); // return user (takes id)

const task = require("./app/controllers/task.controller.js");
app.post("/task/", verifyToken, task.create); // create a new task (takes name, deadline, user_id, (optional) parent_task_id, (optional) description)
app.get("/task/", task.findAll); // get all tasks
app.post("/task/byId", verifyToken, task.findTaskById); // get task by id
app.post("/task/byUserId", verifyToken, task.findTaskByUserId); // get task by user_id
app.post("/task/getChildren", verifyToken, task.getChildren); // get children of a task
app.post("/task/submit", verifyToken, task.submitTask); // make a submission in a task ( takes id, submission)
app.post("/task/review", verifyToken, task.reviewTask); // review a submission in a task ( takes id, reviewed, comment)

// require("./app/routes/institute.routes.js")(app);
// require("./app/routes/user.routes.js")(app);

app.listen('4000', () => {
  console.log('Server running on port 4000')
})