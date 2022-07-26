import React, { useState } from "react";
import { BaseSyntheticEvent } from "../../types/Events";

interface Props {
  newTodo: (arg: string) => void;
}

const NewTodo: React.FC<Props> = (props) => {
  const [todo, setTodo] = useState("");

  const submitHandler = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    props.newTodo(todo);
    setTodo("");
  };

  const todoHandler = (event: BaseSyntheticEvent) => {
    setTodo(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Nueva tarea"
        value={todo}
        onChange={todoHandler}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default NewTodo;
