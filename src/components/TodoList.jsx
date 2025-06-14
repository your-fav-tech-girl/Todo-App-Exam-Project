import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loadTodos, saveTodos } from '../utils';
import TodoModal from './TodoModal';

export default function TodoList() {
  const [todos, setTodos] = useState(loadTodos());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const todosPerPage = 10;

  const filteredTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()))
    .filter(todo => filter === "all" || todo.status === filter);

  const currentTodos = filteredTodos.slice((page - 1) * todosPerPage, page * todosPerPage);

  const addTodo = (title) => {
    const newTodo = { id: Date.now(), title, status: "pending" };
    const updated = [...todos, newTodo];
    setTodos(updated);
    saveTodos(updated);
  };

  const deleteTodo = (id) => {
    const updated = todos.filter(t => t.id !== id);
    setTodos(updated);
    saveTodos(updated);
  };

  return (
    <section>
      <div style={{ marginBottom: '1rem' }}>
        <input
          aria-label="Search todos"
          placeholder="Search..."
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          aria-label="Filter todos"
          onChange={e => setFilter(e.target.value)}
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
        <button onClick={() => setModalOpen(true)}>Add Todo</button>
      </div>
      <ul aria-live="polite">
        {currentTodos.map(todo => (
          <li key={todo.id} style={{ marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
            <Link to={`/todo/${todo.id}`} style={{ color: 'purple', textDecoration: 'underline' }}>{todo.title}</Link>
            <span style={{ marginLeft: '0.5rem' }}>[{todo.status}]</span>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Previous</button>
        <span style={{ margin: '0 1rem' }}>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
      {modalOpen && <TodoModal onClose={() => setModalOpen(false)} onAdd={addTodo} />}
    </section>
  );
}
