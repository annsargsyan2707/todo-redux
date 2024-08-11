import React from "react";

const todoList = () => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggle(todo.id)}
          />
          <span
            style={
              todo.completed
                ? { textDecoration: "line-through" }
                : { color: "green" }
            }
          >
            {todo.text}
          </span>
          <span
            style={{ color: "red", margin: "6px", cursor: "pointer" }}
            onClick={() => removeTodo(todo.id)}
          >
            *
          </span>
        </li>
      ))}
    </ul>
  );
};

export default todoList;
