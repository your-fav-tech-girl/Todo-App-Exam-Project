import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadTodos, saveTodos } from "../api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle2, Circle, Undo2, ArrowLeft } from "lucide-react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>(loadTodos());

  const todo = todos.find((t) => String(t.id) === id);
  if (!todo) return <div className="p-4">Todo not found.</div>;

  const toggleStatus = () => {
    const next = todos.map((t) =>
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    );
    setTodos(next);
    saveTodos(next);
  };

  const isDone = todo.completed;
  const statusIcon = isDone ? (
    <CheckCircle2 className="w-4 h-4" />
  ) : (
    <Circle className="w-4 h-4" />
  );
  const statusText = isDone ? "Completed" : "Incomplete";

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>{todo.title}</CardTitle>
        <Badge
          className={`inline-flex items-center gap-1 ${
            isDone ? "bg-green-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          {statusIcon}
          {statusText}
        </Badge>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        <p>ID #{todo.id}</p>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button onClick={toggleStatus} variant="default" className="gap-1">
          <Undo2 className="w-4 h-4" />
          Toggle Status
        </Button>

        <Button
          onClick={() => navigate(-1)}
          variant="default"
          className="gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </CardFooter>
    </Card>
  );
}
