const sql = require("./db.js");

const Todo = function(todo) {
    this.task        = todo.task;
    this.priority    = todo.priority;
    this.createdDate = new Date().toJSON().slice(0, 19).replace('T', ' ');
};

Todo.create = (newTodo, result) => {
    sql.query("INSERT INTO Todos SET ?", newTodo, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created todo: ", {id: res.insertId, ...newTodo});
        result(null, {id: res.insertId, ...newTodo});
    });
};

Todo.getAll = result => {
    sql.query("SELECT * FROM Todos", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("todos: ", res);
        result(null, res);
    });
};

Todo.remove = (id, result) => {
    sql.query("DELETE FROM Todos WHERE id = ?", id, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted todo with id: ", id);
        result(null, res);
    });
};

module.exports = Todo;
