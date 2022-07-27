/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { BaseSyntheticEvent } from "../../types/Events";
import { css } from "@emotion/react";

interface Props {
  createTodo: (a: string) => void;
}

const addInput = css({
  backgroundColor: "#fbc531",
  border: "2px solid #000",
  borderRadius: "4px",
  padding: "6px",
  marginRight: "8px",
  minWidth: "200px",
  outline: "none",
});

const addButton = css({
  backgroundColor: "#f5f6fa",
  border: "1px solid #95a5a6",
  cursor: "pointer",
  padding: "6px 16px",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#dcdde1",
  },
});

const NewTodo: React.FC<Props> = (props) => {
  const [todo, setTodo] = useState("");

  const submitHandler = (event: BaseSyntheticEvent) => {
    event.preventDefault();

    if (todo.trim().length === 0) {
      return;
    }

    props.createTodo(todo);
    setTodo("");
  };

  const todoHandler = (event: BaseSyntheticEvent) => {
    setTodo(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        css={addInput}
        type="text"
        placeholder="Nueva tarea"
        value={todo}
        onChange={todoHandler}
      />
      <button css={addButton} type="submit">
        Agregar
      </button>
    </form>
  );
};

export default NewTodo;
