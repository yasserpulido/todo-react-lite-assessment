import { render, screen, within } from "@testing-library/react";
import { Todo } from "../../../types/Todo";
import TodoList from "../TodoList";

describe("TodoList", () => {
  const todo: Todo[] = [
    {
      id: "t01",
      text: "Hacer una prueba",
      done: false,
    },
    {
      id: "t02",
      text: "Hacer dos prueba",
      done: false,
    },
  ];

  test("Should TodoList to match Snapshot", () => {
    // Act
    const { container } = render(
      <TodoList todos={todo} doneToggle={() => {}} updateTodo={() => {}} />
    );

    // Assert
    expect(container).toMatchSnapshot();
  });

  test("Should TodoList render", () => {
    // Act
    render(
      <TodoList todos={todo} doneToggle={() => {}} updateTodo={() => {}} />
    );
    const list = screen.getByRole("list");
    const { getAllByRole } = within(list)
    const items = getAllByRole("listitem")

    // Assert
    expect(list).toBeInTheDocument();
    expect(items.length).toBe(2)
  });
});
