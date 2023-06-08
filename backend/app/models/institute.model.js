const db = require("./db.js");

const Institute = function (institute) {
    this.name = institute.name;
    this.password = institute.password;
    this.roles = institute.roles || [];
};

Institute.create = (newInstitute, result) => {
    db.query("INSERT INTO institutes SET name = ?, password = ?", [newInstitute.name, newInstitute.password], (err, res) => {
        if (err) {
            console.log("error: ", err);
            // console.log("newInstitute: ", newInstitute);
            result(err, null);
            return;
        }

        console.log("created institute: ", { id: res.insertId, ...newInstitute });
        result(null, { id: res.insertId, ...newInstitute });
    });
};

Institute.findById = (instituteId, result) => {
    db.query(`SELECT * FROM institutes WHERE id = ${instituteId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found institute: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Institute with the id
        result({ kind: "not_found" }, null);
    });
};

Institute.getAll = result => {
    db.query("SELECT * FROM institutes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("institutes: ", res);
        result(null, res);
    });
};

Institute.updateById = (id, institute, result) => {
    db.query(
        "UPDATE institutes SET name = ?, password = ?, roles = ? WHERE id = ?",
        [institute.name, institute.password, institute.roles, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Institute with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated institute: ", { id: id, ...institute });
            result(null, { id: id, ...institute });
        }
    );
};

Institute.addRole = (id, role, result) => {
    db.query(
        "UPDATE institutes SET roles = \
         IF(roles IS NULL OR JSON_TYPE(roles) != 'ARRAY', JSON_ARRAY(), roles), \
         roles = JSON_ARRAY_APPEND(roles, '$', ?) WHERE id = ?",
        [role, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Institute with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated institute: ", { id: id, ...role });
            result(null, { id: id, ...role });
        }
    );
};

Institute.getRoles = (name, result) => {
    // console.log(name);
    db.query(
        "SELECT roles FROM institutes WHERE name = ?",
        [name],
        (err, res) => {
            // console.log(name);
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.length) {
                console.log("found institute: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found Institute with the id
            if (res.length == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
        }
    );
};

Institute.login = (name, password, result) => {
    db.query(`SELECT * FROM institutes WHERE name = '${name}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
        } else {
            result({ kind: "not_found" }, null);
            return;
        }
    });
};


module.exports = Institute;