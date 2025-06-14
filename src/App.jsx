import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layouts';
import Home from './components/Home';
import TodoDetails from './components/TodoDetails';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import NotFound from './components/NotFound';
import TestError from './components/TestError';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route index element={<Home />} />
          <Route path="todos/:id" element={<TodoDetails />} />
          <Route path="add" element={<AddTodo />} />
          <Route path="edit/:id" element={<EditTodo />} />
          <Route path="test-error" element={<TestError />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Page */}
       </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
































