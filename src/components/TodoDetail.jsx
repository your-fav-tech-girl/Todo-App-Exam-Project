import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadTodos, saveTodos } from "../api";
import {Card,CardHeader,CardTitle,CardContent,CardFooter} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle2, Circle, Undo2, ArrowLeft } from "lucide-react";

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todos, setTodos] = useState(loadTodos());

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
  const statusColor = isDone ? "success" : "secondary";

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>{todo.title}</CardTitle>
        <Badge variant={statusColor} className="inline-flex items-center gap-1">
          {statusIcon}
          {todo.status}
        </Badge>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        <p>ID #{todo.id}</p>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button
          onClick={toggleStatus}
          size="sm"
          variant="default"
          className="gap-1"
        >
          <Undo2 className="w-4 h-4" />
          Toggle Status
        </Button>

        <Button
          onClick={() => navigate(-1)}
          size="sm"
          variant="secondary"
          className="gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </CardFooter>
    </Card>
  );
}
