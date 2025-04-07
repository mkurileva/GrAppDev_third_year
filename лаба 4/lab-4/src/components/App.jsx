import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo, toggleTodo } from "../actions";
import TodoList from "./TodoList";

const App = ({ todos, addTodo, toggleTodo }) => {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !deadline) return;
    addTodo(text, deadline);
    setText("");
    setDeadline("");
  };

  return (
    <div>
      <h1>Список дел</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите задачу"
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button type="submit">Добавить</button>
      </form>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </div>
  );
};

export default connect(
  (state) => ({ todos: state.todos }),
  { addTodo, toggleTodo }
)(App);