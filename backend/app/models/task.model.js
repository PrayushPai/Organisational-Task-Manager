const db = require("./db.js");

const Task = function (task) {
    this.id = task.id;
    this.name = task.name;
    this.parent_task_id = task.parent_task_id || -1;
    this.child_task_ids = task.child_task_ids || [];
    this.user_id = task.user_id;
    this.reviewed = task.reviewed || 0; // -1 = rejected, 0 = not reviewed, 1 = accepted
    this.comment = task.comment || "";
    this.progress = task.progress || 0;
    this.description = task.description || "";
    this.deadline = task.deadline;
    this.submission = task.submission || "";
};

Task.create = (newTask, result) => {
    db.query("INSERT INTO tasks SET name = ?, parent_task_id = ?, user_id = ?, reviewed = ?, comment = ?, progress = ?, description = ?, deadline = ?", [newTask.name, newTask.parent_task_id, newTask.user_id, newTask.reviewed, newTask.comment, newTask.progress, newTask.description, newTask.deadline], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        console.log(res.insertId);
        //print all details of new created task including id
        let id = res.insertId;
        console.log("created task: ", { id_: id, ...newTask });
        result(null, { id_: res.insertId, ...newTask });
    });
};

Task.findById = (taskId, result) => {
    db.query(`SELECT * FROM tasks WHERE id = ${taskId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found task: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Task with the id
        result({ kind: "not_found" }, null);
    });
};

Task.getByUserId = (userId, result) => {
    db.query(`SELECT * FROM tasks WHERE user_id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tasks: ", res);
            result(null, res);
            return;
        }

        // not found Task with the id
        result({ kind: "not_found" }, null);
    });
};

Task.submit = (taskId, submission, result) => {
    db.query(`UPDATE tasks SET progress = ?, submission = ? WHERE id = ?`, [100, submission, taskId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("submitted task: ", res);
        result(null, res);
    });
};

Task.getChildren = (taskId, result) => {
    db.query(`SELECT * FROM tasks WHERE parent_task_id = ${taskId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }


        console.log("found children: ", res);
        result(null, res);
        return;
    });
};

Task.getAll = result => {
    db.query("SELECT * FROM tasks", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tasks: ", res);
        result(null, res);
    });
};

Task.review = (newTask, result) => {
    // console.log(newTask);
    db.query(`UPDATE tasks SET reviewed = ?, comment = ? WHERE id = ?`, [newTask.reviewed, newTask.comment, newTask.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("reviewed task: ", res);
        result(null, res);
    });
};

Task.updateProgress = (taskId, result) => {
    // const parentId = taskId; // replace with the ID of the parent task you want to update

    const query = `
    UPDATE tasks AS parent
    JOIN (
        SELECT parent_task_id, AVG(progress) AS child_progress
        FROM tasks
        WHERE parent_task_id = (SELECT parent_task_id FROM tasks WHERE id = ?)
        GROUP BY parent_task_id
    ) AS child ON parent.id = child.parent_task_id
    SET parent.progress = child.child_progress;   
    `;

    db.query(query, [taskId], (err, res) => {
        if (err) {
            console.error("Error updating parent task progress:", err);
            result(err, null);
            return;
        }
        console.log("Parent task progress updated successfully.");

        db.query(`SELECT parent_task_id FROM tasks WHERE id = ${taskId}`, (err2, res2) => {
            if (err2) {
                console.log("error: ", err2);
                result(err2, null);
                return;
            }
            if (res2[0].parent_task_id === -1) {
                result(null, res);
                return;
            }
            return Task.updateProgress(res2[0].parent_task_id, result);
        });
    });
};

Task.reject = (newTask, result) => {
    db.query(`UPDATE tasks SET progress = 0, comment = ?, submission = "", reviewed = -1 WHERE id = ?`, [newTask.comment, newTask.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("rejected task: ", res);
        result(null, res);
    });
};

Task.addChild = (taskId, childId, result) => {
    console.log(taskId, childId);

    db.query(`UPDATE tasks SET \
        child_task_ids = IF(child_task_ids IS NULL OR JSON_TYPE(child_task_ids) != 'ARRAY', JSON_ARRAY(), child_task_ids), \
        child_task_ids = JSON_ARRAY_APPEND(child_task_ids, '$', ?) WHERE id = ?`,
        [childId, taskId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("added child task: ", res);
            result(null, res);
        });
};

Task.delete = (taskId, result) => {
    db.query("DELETE FROM tasks WHERE id = ?", taskId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Task with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted task with id: ", taskId);
        result(null, res);
    });
};

module.exports = Task; 
