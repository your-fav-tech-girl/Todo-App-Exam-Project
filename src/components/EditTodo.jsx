import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodoById, updateTodo } from '../api';
import TodoModal from './TodoModal';

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(true);

  const { data: todo, isLoading, isError } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchTodoById(id),
  });

  const { mutate: updateTodoMutation } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      navigate('/');
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading todo.</p>;

  return (
    <>
      {isOpen && (
        <TodoModal
          initialData={todo}
          onSubmit={(updated) =>
            updateTodoMutation({ id, updatedTodo: updated })
          }
          onClose={() => {
            setIsOpen(false);
            navigate('/');
          }}
        />
      )}
    </>
  );
};

export default EditTodo;










































