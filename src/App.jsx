import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";

const TestError = () => {
  throw new Error("Test error");
};

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<TodoList />} />
          <Route path="todos/:id" element={<TodoDetail />} />
          <Route path="test-error" element={<TestError />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
