export const addTodo = (text, deadline) => ({
  type: 'ADD_TODO',
  text,
  deadline,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});