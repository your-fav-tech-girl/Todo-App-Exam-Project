import axios from "axios";

export const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todos`);
  return response.data;
};

export const fetchTodo = async (id) => {
  const response = await axios.get(`${BASE_URL}/todos/${id}`);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(`${BASE_URL}/todos`, todo);
  return response.data;
};


export const updateTodo = async (id, updates) => {
  const response = await axios.put(`${BASE_URL}/todos/${id}`, updates);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${BASE_URL}/todos/${id}`);
  return response.data;
};
