// src/utils.js

export function loadTodos() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}
