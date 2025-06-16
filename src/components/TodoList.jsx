import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, loadTodos } from "../api";
import {CheckCircle,Circle,Pencil,TrashIcon} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Input
          placeholder="Add new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <Button className="bg-green-500 text-white" onClick={handleAdd}>
          Add{" "}
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => setStatusFilter("all")}
        >
          All
        </Button>
        <Button
          variant={statusFilter === "completed" ? "default" : "outline"}
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

      <ul className="divide-y rounded-lg bg-gray-500 text-grey-600">
        {currentItems.map((todo) => (
          <li
            key={todo.id}
            className="p-4 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              {todo.completed ? (
                <CheckCircle className="shrink-0 text-green-500" />
              ) : (
                <Circle className="shrink-0 text-gray-600" />
              )}
              <Link
                to={`/todos/${todo.id}`}
                className={todo.completed ? "line-through opacity-60" : ""}
              >
                {todo.title}
              </Link>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline">
                <Pencil className="w-4 h-4 text-green-500" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => handleDelete(todo.id)}
              >
                <TrashIcon className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center gap-2">
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
