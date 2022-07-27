/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { BaseSyntheticEvent } from "../../types/Events";
import { Todo } from "../../types/Todo";
import { css } from "@emotion/react";

interface Props {
  todo: Todo;
  editTodo: (a: string, b: string) => void;
}

const editInput = css({
  backgroundColor: "#fbc531",
  border: "2px solid #000",
  borderRadius: "4px",
  padding: "6px",
  margin: "8px",
  minWidth: "200px",
  outline: "none",
});

const saveButton = css({
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

const EditTodo: React.FC<Props> = (props) => {
  const [todo, setTodo] = useState({ ...props.todo });

  const submitHandler = (event: BaseSyntheticEvent) => {
    event.preventDefault();

    if (todo.text.trim().length === 0) {
      return;
    }

    props.editTodo(todo.id, todo.text);
  };

  const todoHandler = (event: BaseSyntheticEvent) => {
    setTodo((prevState: Todo) => {
      return { ...prevState, text: event.target.value };
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        css={editInput}
        type="text"
        value={todo.text}
        onChange={todoHandler}
      />
      <button css={saveButton} type="submit">
        Guardar
      </button>
    </form>
  );
};

export default EditTodo;
