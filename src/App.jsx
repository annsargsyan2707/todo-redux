import React from "react";
import { useState } from "react";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const addTodo = () => {
    if (text.trim().length) {
      setTodos([
        ...todos,
        {
          id: new Date().toISOString(),
          text,
          completed: false,
        },
      ]);
      setText("");
    }
  };

  const toggle = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed,
        };
      })
    );
  };
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  return (
    <div>
      <label>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={addTodo}>Add Todo</button>
      </label>
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
    </div>
  );
};

export default App;
