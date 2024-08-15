const Todo = require("../models/todoModel");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const todo = await Todo.create({
      title,
      description,
      user: req.user.id,
    });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo || todo.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "ToDo not found" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo || todo.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "ToDo not found" });
    }

    await todo.remove();
    res.json({ message: "ToDo removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
