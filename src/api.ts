export const TODOS_KEY = "my_todos";
const ENDPOINT = "https://jsonplaceholder.typicode.com/todos";

export function loadTodos() {
  const data = localStorage.getItem(TODOS_KEY);
  return data ? JSON.parse(data) : [];
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}
export async function fetchTodos() {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error("Network response was not ok");
  const todos = await res.json();
  saveTodos(todos);
  return todos;
}

export interface FetchTodoByIdResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function fetchTodoById(
  id: number
): Promise<FetchTodoByIdResponse> {
  const res = await fetch(`${ENDPOINT}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch todo");
  const todo: FetchTodoByIdResponse = await res.json();

  const next = [...loadTodos().filter((t: Todo) => t.id !== todo.id), todo];
  saveTodos(next);
  return todo;
}

export interface CreateTodoData {
  userId: number;
  title: string;
  completed: boolean;
}

export interface CreateTodoResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function createTodo(
  data: CreateTodoData
): Promise<CreateTodoResponse> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  const created: CreateTodoResponse = await res.json();

  saveTodos([created, ...loadTodos()]);
  return created;
}

export interface id {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export interface UpdateTodoData {
  title?: string;
  completed?: boolean;
  userId?: number;
}

export interface UpdateTodoResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function updateTodo(
  id: number,
  updates: UpdateTodoData
): Promise<UpdateTodoResponse> {
  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  const updated: UpdateTodoResponse = await res.json();

  const next = loadTodos().map((t: Todo) => (t.id === id ? updated : t));
  saveTodos(next);
  return updated;
}

export interface DeleteTodoResponse {
  success: boolean;
}

export async function deleteTodo(id: number): Promise<DeleteTodoResponse> {
  const res = await fetch(`${ENDPOINT}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete todo");

  saveTodos(loadTodos().filter((t: Todo) => t.id !== id));
  return { success: true };
}
