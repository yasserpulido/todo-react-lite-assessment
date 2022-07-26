import React, { useState } from "react";
import NewTodo from "../components/todo/NewTodo";
import TodoList from "../components/todo/TodoList";
import { Todo as TodoType } from "../types/Todo";

const DUMMY_DATA: TodoType[] = [
  {
    id: "t01",
    value: "Aprender TypeScript",
    isDone: false,
  },
  {
    id: "t02",
    value: "Hacer Tarea",
    isDone: true,
  },
  {
    id: "t03",
    value: "Entregar Tarea",
    isDone: false,
  },
];

const Todo: React.FC = () => {
  const [todos, setTodos] = useState(DUMMY_DATA);
  const [showDone, setShowDone] = useState(false);

  const newTodoHandler = (todo: string): void => {
    const idGenerated = Math.floor(Math.random() * 100).toString();

    setTodos((prevState: TodoType[]) => {
      return [...prevState, { id: idGenerated, value: todo, isDone: false }];
    });
  };

  const doneToggleHandler = (id: string, checked: boolean): void => {
    const n = todos;

    n.forEach((value) => {
      if (value.id === id) {
        value.isDone = checked;
      }
    });

    console.log(n);

    setTodos(() => {
      return [...n];
    });
  };

  const showDoneHandler = () => {
    setShowDone(!showDone);
  };

  const todosFilter = showDone
    ? todos
    : todos.filter((todo) => todo.isDone === showDone);

  console.log(todos);

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <button type="button" onClick={showDoneHandler}>
        {!showDone ? "Mostrar Completadas" : "Quitar Completadas"}
      </button>
      <NewTodo newTodo={newTodoHandler} />
      <TodoList todos={todosFilter} doneToggle={doneToggleHandler} />
    </div>
  );
};

export default Todo;
