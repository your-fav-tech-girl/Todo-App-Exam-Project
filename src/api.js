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

export async function fetchTodoById(id) {
  const res = await fetch(`${ENDPOINT}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch todo');
  const todo = await res.json();

  const next = [...loadTodos().filter(t => t.id !== todo.id), todo];
  saveTodos(next);
  return todo;
}

export async function createTodo(data) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create todo');
  const created = await res.json();

  saveTodos([created, ...loadTodos()]);
  return created;
}

export async function updateTodo(id, updates) {
  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  const updated = await res.json();

  const next = loadTodos().map(t => (t.id === id ? updated : t));
  saveTodos(next);
  return updated;
}

export async function deleteTodo(id) {
  const res = await fetch(`${ENDPOINT}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete todo');

  saveTodos(loadTodos().filter(t => t.id !== id));
  return true;                     
}
