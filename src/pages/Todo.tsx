/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import NewTodo from "../components/todo/NewTodo";
import TodoList from "../components/todo/TodoList";
import { Todo as TodoType } from "../types/Todo";
import { css } from "@emotion/react";

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

const todoCard = css`
  margin: 4rem auto;
  padding: 2rem 3rem 3rem;
  max-width: 500px;
  background-color: #fbc531;
  color: #000;
  box-shadow: 5px 5px 0px 0px rgb(0, 0, 0, 1);
  border: 2px solid #000;
  border-radius: 4px;
`;

const todoTitle = css`
  text-align: center;
`;

const showDoneButton = css({
  backgroundColor: "#f5f6fa",
  border: "1px solid #95a5a6",
  cursor: "pointer",
  padding: "6px 16px",
  borderRadius: "4px",
  marginBottom: "8px",
  textAlign: "right",
  "&:hover": {
    backgroundColor: "#dcdde1",
  },
});

const formWrap = css({
  textAlign: "right",
});

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

    setTodos(() => {
      return [...n];
    });
  };

  const editTodoHandler = (id: string, value: string) => {
    const updatedTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, value };
      }
      return todo;
    });

    setTodos(updatedTodo);
  };

  const showDoneHandler = () => {
    setShowDone(!showDone);
  };

  const todosFilter = showDone
    ? todos
    : todos.filter((todo) => todo.isDone === showDone);

  return (
    <div css={todoCard}>
      <h1 css={todoTitle}>LISTA DE TAREAS</h1>
      <div css={formWrap}>
        <button css={showDoneButton} type="button" onClick={showDoneHandler}>
          {!showDone ? "Mostrar Completadas" : "Quitar Completadas"}
        </button>
        <NewTodo newTodo={newTodoHandler} />
      </div>
      <TodoList
        todos={todosFilter}
        doneToggle={doneToggleHandler}
        editTodo={editTodoHandler}
      />
    </div>
  );
};

export default Todo;
