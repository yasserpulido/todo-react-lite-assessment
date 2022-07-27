/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import NewTodo from "../components/todo/NewTodo";
import TodoList from "../components/todo/TodoList";
import { css } from "@emotion/react";
import todoStore from "../store/todoStore";
import { observer } from "mobx-react";

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
  const [showDone, setShowDone] = useState(false);

  const createTodoHandler = (text: string): void => {
    todoStore.createTodo(text);
  };

  const updateTodoHandler = (id: string, text: string) => {
    todoStore.updateTodo(id, text);
  };

  const doneToggleHandler = (id: string, checked: boolean): void => {
    todoStore.doneToggle(id, checked);
  };

  const showDoneHandler = () => {
    setShowDone(!showDone);
  };

  const todosFilter = showDone
    ? todoStore.todos
    : todoStore.todos.filter((todo) => todo.done === showDone);

  return (
    <div css={todoCard}>
      <h1 css={todoTitle}>LISTA DE TAREAS</h1>
      <div css={formWrap}>
        <button css={showDoneButton} type="button" onClick={showDoneHandler}>
          {!showDone ? "Mostrar Completadas" : "Quitar Completadas"}
        </button>
        <NewTodo createTodo={createTodoHandler} />
      </div>
      <TodoList
        todos={todosFilter}
        doneToggle={doneToggleHandler}
        updateTodo={updateTodoHandler}
      />
    </div>
  );
};

export default observer(Todo);
