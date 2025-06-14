
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTodos = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
};

export const fetchTodoById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch todo');
  return res.json();
};

export const createTodo = async (newTodo) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo),
  });
  if (!res.ok) throw new Error('Failed to create todo');
  return res.json();
};

export const updateTodo = async ({ id, updatedTodo }) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTodo),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
};


export const deleteTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete todo');
  return res.json();
};

