import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodoById, deleteTodo } from '../api';

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirming, setConfirming] = useState(false);

  const { data: todo, isLoading, isError } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchTodoById(id),
  });

  const { mutate: deleteTodoMutation, isPending } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      navigate('/');
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error fetching todo.</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">{todo.title}</h2>
      <p>Status: {todo.completed ? 'Completed' : 'Incomplete'}</p>
      <p>ID: {todo.id}</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => navigate(`/edit/${todo.id}`)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-800"
        >
          Edit
        </button>

        <button
          onClick={() => setConfirming(true)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Back
        </button>
      </div>

      {confirming && (
        <div className="mt-4 p-4 bg-red-100 rounded shadow border border-red-300">
          <p className="mb-2">Are you sure you want to delete this todo?</p>
          <div className="flex gap-3">
            <button
              onClick={() => deleteTodoMutation(todo.id)}
              disabled={isPending}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              {isPending ? 'Deleting...' : 'Yes, Delete'}
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoDetails;
