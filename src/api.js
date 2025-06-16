export const TODOS_KEY = 'my_todos';
const ENDPOINT = 'https://jsonplaceholder.typicode.com/todos';

export function loadTodos() {
  const data = localStorage.getItem(TODOS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveTodos(todos) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

export async function fetchTodos() {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error('Network response was not ok');
  const todos = await res.json();
  saveTodos(todos);
  return todos;
}
