module.exports = app => {
    const todos = require("../controllers/todo.controller.js");

    app.post("/todo", todos.create);

    app.get("/todo", todos.getAll);

    app.delete("/todo/:todoId", todos.delete);
};
