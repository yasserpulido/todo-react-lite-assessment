import { fireEvent, render, screen } from "@testing-library/react";
import { Todo } from "../../../types/Todo";
import EditTodo from "../EditTodo";

describe("EditTodo", () => {
  const todo: Todo = {
    id: "t01",
    text: "Hacer una prueba",
    done: false,
  };

  test("Should EditTodo form to match Snapshot", () => {
    // Act
    const { container } = render(<EditTodo editTodo={() => {}} todo={todo} />);

    // Assert
    expect(container).toMatchSnapshot();
  });

  test("Should EditTodo form render", () => {
    // Act
    render(<EditTodo editTodo={() => {}} todo={todo} />);
    const form = screen.getByRole("form");
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    // Assert
    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveValue(todo.text);
    expect(button.innerHTML).toBe("Guardar");
  });

  test("Should EditTodo form submit and call createTodo method", () => {
    // Arrange
    const id = "t01";
    const text = "Hacer una prueba";
    const editTodo = jest.fn();

    // Act
    render(<EditTodo editTodo={editTodo} todo={todo} />);
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    // Assert
    expect(editTodo).toHaveBeenCalled();
    expect(editTodo).toHaveBeenCalledTimes(1);
    expect(editTodo).toHaveBeenCalledWith(id, text);
  });

  test("Should not EditTodo form submit", () => {
    // Arrange
    const editTodo = jest.fn();

    // Act
    render(<EditTodo editTodo={editTodo} todo={todo} />);
    const form = screen.getByRole("form");
    const input = screen.getByRole("textbox");

    fireEvent.input(input, { target: { value: "" } });
    fireEvent.submit(form);

    // Assert
    expect(editTodo).not.toHaveBeenCalled();
  });
});
