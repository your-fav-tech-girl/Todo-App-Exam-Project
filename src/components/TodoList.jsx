import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, loadTodos } from "../api";
import { CheckCircle, Circle, Pencil, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

export default function TodoList() {
  const queryClient = useQueryClient();
  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    initialData: loadTodos,
    staleTime: 1000 * 60 * 5,
  });

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newTodo, setNewTodo] = useState("");

  const totalPages = Math.ceil(todos.length / PAGE_SIZE);

  const handleAdd = () => {
    if (!newTodo.trim()) return;
    const newItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    queryClient.setQueryData(["todos"], (old = []) => [newItem, ...old]);
    setNewTodo("");
  };

  const handleDelete = (id) => {
    queryClient.setQueryData(["todos"], (old = []) =>
      old.filter((t) => t.id !== id)
    );
  };

  const filteredTodos = todos
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => {
      if (statusFilter === "completed") return t.completed;
      if (statusFilter === "incomplete") return !t.completed;
      return true;
    });

  const currentItems = useMemo(
    () => filteredTodos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredTodos, page]
  );

  if (isLoading && todos.length === 0) return <p>Loading…</p>;
  if (isError) return <p className="text-red-600">Error: {error.message}</p>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <Input
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Input
          placeholder="Add new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="flex-1"
        />
        <Button
          className="bg-green-500 text-white hover:bg-green-600 whitespace-nowrap"
          onClick={handleAdd}
        >
          Add
        </Button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-start">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => setStatusFilter("all")}
        >
          All
        </Button>
        <Button
          variant={statusFilter === "completed" ? "outline": "none"}
          onClick={() => setStatusFilter("completed")}
        >
          Completed
        </Button>
        <Button
          variant={statusFilter === "incomplete" ? "default" : "outline"}
          onClick={() => setStatusFilter("incomplete")}
        >
          Incomplete
        </Button>
      </div>

      {/* Todo List */}
      <ul className="divide-y rounded-lg bg-gray-100 shadow">
        {currentItems.map((todo) => (
          <li
            key={todo.id}
            className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4"
          >
            <div className="flex items-center gap-3 break-words">
              {todo.completed ? (
                <CheckCircle className="text-green-500 shrink-0" />
              ) : (
                <Circle className="text-gray-500 shrink-0" />
              )}
              <Link
                to={`/todos/${todo.id}`}
                className={`text-base ${todo.completed ? "line-through opacity-60" : ""}`}
              >
                {todo.title}
              </Link>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline">
                <Pencil className="w-4 h-4 text-green-500" />
              </Button>
              <Button size="icon" variant="destructive" onClick={() => handleDelete(todo.id)}>
                <TrashIcon className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
