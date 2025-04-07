import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, toggleTodo }) => {
  const groupedTodos = todos.reduce((acc, todo) => {
    const date = new Date(todo.deadline).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(todo);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedTodos).map(date => (
        <div key={date}>
          <h4>{date}</h4>
          {groupedTodos[date].map(todo => (
            <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
