const Task = require("../models/task.model.js");

// Create and Save a new Task
exports.create = (req, res) => {
    console.log(req.body);
    // Validate request
    if (!req.body.name || !req.body.deadline || req.body.user_id == null) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Task
    const task = new Task({
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        user_id: req.body.user_id,
        parent_task_id: req.body.parent_task_id
    });

    // Save Task in the database
    Task.create(task, (err, data) => {
        console.log("in backend");
        console.log(data);
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            });
        else if (req.body.parent_task_id != -1) {
            Task.addChild(req.body.parent_task_id, data.id_, (err, data2) => {
                if (err) {
                    Task.delete(data.id_, (err, data3) => {
                        if (err) {
                            console.log("error: ", err);
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while deleting task."
                            });
                        }
                    });
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while adding child to parent."
                    });
                } else res.send(data);
            });
        } else
            res.send(data);
    });
};

exports.findAll = (req, res) => {
    Task.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        else res.send(data);
    });
};

exports.findTaskById = (req, res) => {
    Task.findById(req.body.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Task with id ${req.body.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Task with id " + req.body.id
                });
            }
        } else res.send(data);
    });
};

exports.findTaskByUserId = (req, res) => {
    Task.getByUserId(req.body.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        else res.send(data);
    });
};

exports.submitTask = (req, res) => {
    Task.submit(req.body.id, req.body, (err, data) => {
        console.log("in backend");
        console.log(req.body);
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while submitting task."
            });
        else res.send(data);
    });
};

exports.getChildren = (req, res) => {
    Task.getChildren(req.body.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while submitting task."
            });
        else res.send(data);
    });
};

exports.reviewTask = (req, res) => {
    const task = new Task({
        id: req.body.id,
        reviewed: req.body.reviewed,
        comment: req.body.comment
    });
    Task.review(task, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while submitting task."
            });
        // else res.send(data);
        else if (req.body.reviewed == 1) {
            Task.updateProgress(req.body.id, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while submitting task."
                    });
                else res.send(data);
            });
        } else {
            Task.reject(task, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while submitting task."
                    });
                else res.send(data);
            });
        }
    });
};

