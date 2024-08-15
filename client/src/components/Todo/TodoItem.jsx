import React from "react";

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id)}
      />
      <span className={todo.completed ? "completed" : ""}>{todo.title}</span>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(todo._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
