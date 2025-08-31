import localforage from "localforage";
import { fetchTodos } from "../api";

const LOCAL_TODO_KEY = "localTodos";
export async function loadLocalTodos(): Promise<Todo[]> {
  const todos = await localforage.getItem<Todo[]>(LOCAL_TODO_KEY);
  return Array.isArray(todos) ? todos : [];
}
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export async function saveLocalTodos(todos: Todo[]): Promise<void> {
  await localforage.setItem(LOCAL_TODO_KEY, todos);
}

export async function fetchAndSyncTodos() {
  const remoteTodos = await fetchTodos();
  await saveLocalTodos(remoteTodos);
  return remoteTodos;
}

export interface UpdateFunction {
  (todos: Todo[]): Todo[];
}

export async function syncLocalUpdate(
  updateFn: UpdateFunction
): Promise<Todo[]> {
  const todos = await loadLocalTodos();
  const updated = updateFn(todos);
  await saveLocalTodos(updated);
  return updated;
}
