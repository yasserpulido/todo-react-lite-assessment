import { fireEvent, render, screen } from "@testing-library/react";
import NewTodo from "../NewTodo";

describe("NewTodo", () => {
  test("Should NewTodo form to match Snapshot", () => {
    // Act
    const { container } = render(<NewTodo createTodo={() => {}} />);

    // Assert
    expect(container).toMatchSnapshot();
  });

  test("Should EditTodo form render", () => {
    // Act
    render(<NewTodo createTodo={() => {}} />);
    const form = screen.getByRole("form");
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    // Assert
    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(button.innerHTML).toBe("Agregar");
  });

  test("Should EditTodo form submit and call createTodo method", () => {
    // Arrange
    const text = "Hacer una prueba";
    const createTodo = jest.fn();

    // Act
    render(<NewTodo createTodo={createTodo} />);

    const form = screen.getByRole("form");
    const input = screen.getByRole("textbox");

    fireEvent.input(input, { target: { value: text } });
    fireEvent.submit(form);

    // Assert
    expect(createTodo).toHaveBeenCalled();
    expect(createTodo).toHaveBeenCalledTimes(1);
    expect(createTodo).toHaveBeenCalledWith(text);
  });

  test("Should not EditTodo form submit", () => {
    // Arrange
    const createTodo = jest.fn();

    // Act
    render(<NewTodo createTodo={createTodo} />);
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    // Assert
    expect(createTodo).not.toHaveBeenCalled();
  });
});
