const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: state.length,
          text: action.text,
          completed: false,
          createdAt: new Date(),
          deadline: action.deadline,
          completedAt: null,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date() : null,
            }
          : todo
      );
    default:
      return state;
  }
};

export default todos;