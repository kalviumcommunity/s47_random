const express = require('express');
const app = express();
const port = 8000;

app.use(express.json()); 

// Sample initial data
let todos = [
    { id: 1, todo: "Learn JavaScript", completed: false },
    { id: 2, todo: "Build a CRUD app", completed: false },
    { id: 3, todo: "Deploy the app", completed: false }
];

app.get("/todos", (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        todo: req.body.todo,
        completed: req.body.completed || false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const update = req.body;
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
        todoToUpdate.todo = update.todo || todoToUpdate.todo;
        todoToUpdate.completed = update.completed || todoToUpdate.completed;
        res.json(todoToUpdate);
    } else {
        res.status(404).json({ error: "Todo not found" });
    }
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.json(todos);
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports
