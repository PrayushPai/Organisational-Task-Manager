const db = require('./db.js');

const User = function (user) {
    this.name = user.name;
    this.password = user.password;
    this.instituteId = user.instituteId;
    this.role = user.role;
    this.parentId = user.parentId;
    this.children = user.children || [];
    this.remainingHours = user.remainingHours || 0;
    this.instituteName = user.instituteName;
};

User.create = (newUser, result) => {
    console.log(newUser);
    db.query("INSERT INTO users SET name = ?, password = ?, role = ?, parentId = ?, instituteId = (SELECT id FROM institutes WHERE name = ?)", [newUser.name, newUser.password, newUser.role, newUser.parentId, newUser.instituteName], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.login = (user, result) => {
    db.query(`SELECT * FROM users WHERE name = '${user.name}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.addChild = (userId, childId, result) => {
    db.query(
        "UPDATE users SET \
        children = IF(children IS NULL OR JSON_TYPE(children) != 'ARRAY', JSON_ARRAY(), children), \
        children = JSON_ARRAY_APPEND(children, '$', ?) WHERE id = ?",
        [childId, userId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: userId });
            result(null, { id: userId });
        }
    );
};

User.delete = (id, result) => {
    db.query("DELETE FROM users WHERE id = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    })
};

User.getAllByInstituteId = (instituteId, result) => {
    db.query(`SELECT * FROM users WHERE instituteId = '${instituteId}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

User.findById = (userId, result) => {
    db.query(`SELECT * FROM users WHERE id = '${userId}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.getChildren = (userId, result) => {
    db.query(`SELECT * FROM users WHERE parentId = '${userId}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } else {
            console.log("found children: ", res);
            result(null, res);
            return;
        }
    });
};

module.exports = User;