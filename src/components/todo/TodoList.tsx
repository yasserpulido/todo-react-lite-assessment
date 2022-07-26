/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { BaseSyntheticEvent } from "../../types/Events";
import { Todo } from "../../types/Todo";
import EditTodo from "./EditTodo";
import { css } from "@emotion/react";

interface Props {
  todos: Todo[];
  doneToggle: (a: string, b: boolean) => void;
  editTodo: (a: string, b: string) => void;
}

const listStyle = css`
  list-style: none;
`;

const labelCheck = css`
  text-decoration-line: line-through;
`;

const TodoList: React.FC<Props> = (props) => {
  const [showEdit, setShowEdit] = useState({ id: "", isEdit: false });

  const doneHandler = (event: BaseSyntheticEvent) => {
    const { id, checked } = event.target;
    props.doneToggle(id, checked);
  };

  const editTodoHandler = (id: string, value: string) => {
    props.editTodo(id, value);
    setShowEdit({ id: "", isEdit: false });
  };

  const showEditHandler = (todo: Todo) => {
    setShowEdit((prevState) => {
      return { id: todo.id, isEdit: !prevState.isEdit };
    });
  };

  return (
    <ul css={listStyle}>
      {props.todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            id={todo.id}
            checked={todo.isDone}
            onChange={doneHandler}
          />
          <label
            css={todo.isDone ? labelCheck : ""}
            onClick={() => showEditHandler(todo)}
          >
            {todo.value}
          </label>
          {showEdit.isEdit && showEdit.id === todo.id && (
            <EditTodo todo={todo} editTodo={editTodoHandler} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
