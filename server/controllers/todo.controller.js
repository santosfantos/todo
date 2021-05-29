const Todo = require("../models/todo.model.js");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    let todo = new Todo({
        task:     req.body.todo.task,
        priority: req.body.todo.priority
    });

    Todo.create(todo, (err, data) => {
        if(err) {
            res.status(500).send({
                message: "Some error occurred while creating the todo."
            });
        }
        else {
            res.status(200).json({status: "success"});
        }
    });
};

exports.getAll = (req, res) => {
    Todo.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message: "Some error occurred while retrieving todos."
            });
        }
        else {
            res.status(200)
               .json({
                   status: "success",
                   data
               });
        }
    });
};

exports.delete = (req, res) => {
    Todo.remove(req.params.todoId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found todo with id ${req.params.todoId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Could not delete todo with id " + req.params.todoId
                });
            }
        }
        else {
            res.status(200).json({status: "success"});
        }
    });
};
