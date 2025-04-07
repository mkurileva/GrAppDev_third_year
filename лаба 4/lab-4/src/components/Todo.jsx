import React from "react";

const getColorForDeadline = (deadline) => {
  const now = new Date();
  const timeLeft = new Date(deadline) - now;
  if (timeLeft < 0) return 'red';
  if (timeLeft < 24 * 60 * 60 * 1000) return 'orange';
  return 'green';
};

const Todo = ({ onClick, completed, text, deadline, completedAt }) => (
  <div
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
      color: completed ? 'gray' : getColorForDeadline(deadline),
    }}
  >
    <input type="checkbox" checked={completed} readOnly /> {text}
    <br />
    {!completed && deadline && <small>Дедлайн: {new Date(deadline).toLocaleString()}</small>}
    {completed && completedAt && <small>✔ Завершено: {new Date(completedAt).toLocaleString()}</small>}
  </div>
);

export default Todo;
