import localforage from 'localforage';

export async function fetchTodos() {
  const cached = await localforage.getItem('todos');

  if (cached) {
    return cached;
  }

  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await response.json();

  await localforage.setItem('todos', todos);

  return todos;
}
