import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:5000/api/todos", config);
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === "") return;

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("http://localhost:5000/api/todos", { title: newTodo }, config);
    setTodos([...todos, data]);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`http://localhost:5000/api/todos/${id}`, config);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const toggleTodo = async (id) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const todo = todos.find((todo) => todo._id === id);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/todos/${id}`,
      { completed: !todo.completed },
      config
    );
    setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
  };

  return (
    <div className="container">
      <h1 className="my-4">ToDo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New ToDo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add
        </button>
      </div>
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
