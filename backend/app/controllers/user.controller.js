const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
        name: req.body.name,
        password: hashedPassword,
        instituteName: req.body.instituteName,
        role: req.body.role,
        parentId: req.body.parentId
    });

    // Save User in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else {
            if (req.body.parentId != 0) {
                User.addChild(req.body.parentId, data.id, (err, data2) => {
                    if (err) {
                        // User.delete(data.id, (err, data3) => {
                        //     if(err) {
                        //         console.log("error: ", err);
                        //         res.status(500).send({
                        //             message:
                        //                 err.message || "Some error occurred while deleting user."
                        //         });
                        //     }
                        // });
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while adding child to parent."
                        });
                    } else res.send(data);
                });
            } else
                res.send(data);
        }
    });
};

// Retrieve all Users from the database of a particular institute.
exports.findAll = (req, res) => {
    User.getAll(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.login = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const user = new User({
        name: req.body.name,
        password: req.body.password
    });

    // Save User in the database
    User.login(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while logging in."
            });
        else {
            if (data.length == 0) {
                res.status(500).send({
                    message:
                        "Invalid username"
                });
            } else if (!bcrypt.compareSync(req.body.password, data.password)) {
                res.status(500).send({
                    message:
                        "Invalid password"
                });
            } else {
                // console.log(data);
                const token = jwt.sign({ id: data.id, name: data.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).send({ auth: true, token: token, data: data });
            }
        }
    });
};

exports.delete = (req, res) => {
    User.delete(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting user."
            });
        else res.send(data);
    });
};


function dfs(node, to_return, data) {
    if (node == null) return;
    console.log(node);
    if (node.children == null) {
        // to_return.push({"name": node.name, "children": []});
        return { "name": node.name };
    }
    let children = node.children;
    let my_children = [];
    children.forEach(child => {
        let child_node = data.find(user => user.id === child);
        var returned = dfs(child_node, my_children, data);
        if (returned != null)
            my_children.push(returned);
    });
    // to_return.push({"name": node.name, "children": my_children});
    return { "name": node.name, "children": my_children };
}

exports.heirarchy = async (req, res) => { // output should be a tree
    console.log(req.body);
    User.getAllByInstituteId(req.body.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else {
            let tree = [];
            let root = data.find(user => user.parentId === 0);
            let new_tree = dfs(root, tree, data);
            console.log(new_tree);
            res.send(new_tree);
        }
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.getChildren = (req, res) => {
    User.getChildren(req.user.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving children."
            });
        else res.send(data);
    });
};