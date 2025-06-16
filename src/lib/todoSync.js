import localforage from "localforage";
import { fetchTodos } from "../api";


const LOCAL_TODO_KEY = "localTodos";
export async function loadLocalTodos() {
  return await localforage.getItem(LOCAL_TODO_KEY) || [];
}
export async function saveLocalTodos(todos) {
  await localforage.setItem(LOCAL_TODO_KEY, todos);
}

export async function fetchAndSyncTodos() {
  const remoteTodos = await fetchTodos();
  await saveLocalTodos(remoteTodos);
  return remoteTodos;
}

export async function syncLocalUpdate(updateFn) {
  const todos = await loadLocalTodos();
  const updated = updateFn(todos);
  await saveLocalTodos(updated);
  return updated;
}
