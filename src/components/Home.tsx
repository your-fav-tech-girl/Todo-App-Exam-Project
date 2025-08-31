import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api";
import {
  Plus,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";

interface Home {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const ItemsPerPage = 10;

const Home = () => {
  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filteredTodos = useMemo(() => {
    return (todos as Home[])
      .filter((todo: Home) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((todo: Home) =>
        filter === "all"
          ? true
          : filter === "complete"
          ? todo.completed
          : !todo.completed
      );
  }, [todos, search, filter]);

  const paginatedTodos = useMemo(() => {
    const start = (page - 1) * ItemsPerPage;
    return filteredTodos.slice(start, start + ItemsPerPage);
  }, [filteredTodos, page]);

  const totalPages = Math.ceil(filteredTodos.length / ItemsPerPage);

  if (isLoading) return <p className="text-center">Loading todos...</p>;
  if (isError)
    return <p className="text-center text-red-500">{error.message}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto purple-500">
      <h1 className="text-4xl font-bold mb-4 text-center text-purple-400">
        Todo List
      </h1>

      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border px-8 py-2 rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search todos"
          />
          <Search className="absolute left-2 top-3 text-gray-400" size={20} />
        </div>

        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-2 py-2 pl-8 rounded"
            aria-label="Filter todos"
          >
            <option value="all" className="text-gray-700 ">
              All
            </option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <Filter className="absolute left-2 top-3 text-gray-400" size={20} />
        </div>

        <Link
          to="/add"
          className="ml-auto bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-800 inline-flex items-center gap-2"
        >
          <Plus size={18} />
          Add Todo
        </Link>
      </div>

      <ul className="space-y-2">
        {paginatedTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-3 bg-gray-200 rounded"
          >
            <div>
              <p className="font-medium">{todo.title}</p>
              <p className="text-sm text-red-600"></p>
            </div>
            <Link
              to={`/todos/${todo.id}`}
              className="text-purple-500 hover:underline inline-flex items-center gap-1"
            >
              <Eye size={18} />
              View
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="flex items-center gap-1 px-3 text-white py-2 bg-purple-500 rounded disabled:opacity-50"
        >
          <ChevronLeft size={18} />
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="flex items-center gap-1 px-3 py-2 text-white bg-purple-500 rounded disabled:opacity-50"
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Home;
