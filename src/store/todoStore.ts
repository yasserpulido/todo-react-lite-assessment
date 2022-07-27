import { makeAutoObservable } from "mobx";
import { Todo as TodoType } from "../types/Todo";

class Todo {
  todos: TodoType[] = [];

  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos") || "[]");
    makeAutoObservable(this);
  }

  createTodo(text: string) {
    const idGenerated = Math.floor(Math.random() * 100).toString();
    const newTodo = { id: idGenerated, text, done: false };
    this.todos.push(newTodo);
    this.setStorage();
  }

  updateTodo = (id: string, text: string) => {
    const todoUpdated = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.text = text;
      }
      return todo;
    });
    this.todos = todoUpdated;
    this.setStorage();
  };

  doneToggle = (id: string, checked: boolean) => {
    const todoUpdated = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.done = checked;
      }
      return todo;
    });
    this.todos = todoUpdated;
    this.setStorage();
  };

  private setStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}

const todoStore = new Todo();

export default todoStore;
