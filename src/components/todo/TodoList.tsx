import React from "react";
import { BaseSyntheticEvent } from "../../types/Events";
import { Todo } from "../../types/Todo";

interface Props {
  todos: Todo[];
  doneToggle: (a: string, b: boolean) => void;
}

const TodoList: React.FC<Props> = (props) => {
  const doneHandler = (event: BaseSyntheticEvent) => {
    const { id, checked } = event.target;
    props.doneToggle(id, checked);
  };

  return (
    <ul>
      {props.todos.map((todo) => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              id={todo.id}
              checked={todo.isDone}
              onChange={doneHandler}
            />{" "}
            {todo.value}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
