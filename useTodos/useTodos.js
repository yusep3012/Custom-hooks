import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-usereducer/todoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // AGREGAR UN NUEVO TODO
  const handleNewTodo = (todo) => {
    const action = {
      type: "[TODO] Add Todo",
      payload: todo,
    };

    dispatch(action);
  };

  // ELIMINAR UN TODO
  const handleDeleteTodo = (id) => {
    dispatch({
      type: "[TODO] Remove Todo",
      payload: id,
    });
  };

  // TACHAR TAREA REALIZADA
  const handleToggleTodo = (id) => {
    dispatch({
      type: "[TODO] Toggle Todo",
      payload: id,
    });
  };

  const todosCount = () => {
    return todos.length;
  };

  const pendingTodosCount = () => {
    return todos.filter((todo) => !todo.done).length;
  };

  return {
    todos,
    handleDeleteTodo,
    handleNewTodo,
    handleToggleTodo,
    todosCount,
    pendingTodosCount,
  };
};
