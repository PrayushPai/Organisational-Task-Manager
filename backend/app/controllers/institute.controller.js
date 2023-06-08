const Institute = require("../models/institute.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Create and Save a new Institute
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Institute
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const institute = new Institute({
        name: req.body.name,
        password: hashedPassword
    });

    // Save Institute in the database
    Institute.create(institute, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Institute."
            });
        else res.send(data);
    });
};

// Retrieve all Institutes from the database.
exports.findAll = (req, res) => {
    Institute.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving institutes."
            });
        else res.send(data);
    });
};

// Find a single Institute with an id
exports.findOne = (req, res) => {
    Institute.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Institute with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Institute with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Institute identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Institute.updateById(
        req.params.id,
        new Institute(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Institute with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Institute with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// exports.addRole = (req, res) => {
//     // Validate Request
//     if (!req.body) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//     }

//     Institute.findById(req.params.id, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Not found Institute with id ${req.params.id}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Error retrieving Institute with id " + req.params.id
//                 });
//             }
//         } else {
//             if (data.roles.includes(req.body.role)) {
//                 res.status(400).send({
//                     message: `Institute with id ${req.params.id} already has role ${req.body.role}.`
//                 });
//             } else {
//                 var Roles = data.roles;
//                 Roles.push(req.body.role);

//                 Institute.updateById(
//                     req.params.id,
//                     new Institute({ name: data.name, password: data.password, roles: Roles}),
//                     (err2, data2) => {
//                         if (err2) {
//                             if (err2.kind === "not_found") {
//                                 res.status(404).send({
//                                     message: `Not found Institute with id ${req.params.id}.`
//                                 });
//                             } else {
//                                 res.status(500).send({
//                                     message: "Error updating Institute with id " + req.params.id
//                                 });
//                             }
//                         } else res.send(data2);
//                     }
//                 );
//             }
//         }
//     });
// };

exports.addRole = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Institute.addRole(
        req.params.id,
        req.body.role,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Institute with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Institute with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.getRoles = (req, res) => {
    console.log(req);
    Institute.getRoles(
        req.body.name,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Institute with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving Institute with id " + req.params.id
                    });
                    console.log(req.body.name);
                }
            } else res.send(data);
        }
    );
};

exports.login = (req, res) => {
    console.log("in backend");
    console.log(req.body);
    Institute.login(
        req.body.name,
        req.body.password,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(502).send({
                        message: `Not found Institute with name ${req.body.name}.`
                    });
                } else if(err.kind === "wrong_password") {
                    res.status(502).send({
                        message: `Wrong password for Institute with name ${req.body.name}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving Institute with name " + req.body.name
                    });
                }
            } else if(!bcrypt.compareSync(req.body.password, data.password)) {
                res.status(502).send({
                    message: `Wrong password for Institute with name ${req.body.name}.`
                });
            } else {
                const token = jwt.sign({ id: data.id, name: data.name }, process.env.JWT_SECRET, { expiresIn: 86400 });
                res.status(200).send({ auth: true, token: token, data: data });
            }
        }
    );
};

