import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '../api';
import TodoModal from './TodoModal';

const AddTodo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: addTodo } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      setIsOpen(false);
    },
  });

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-800"
      >
        Add Todo
      </button>

      {isOpen && (
        <TodoModal
          onSubmit={(data) =>
            addTodo({
              ...data,
              userId: 1,
              completed: data.completed || false,
            })
          }
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default AddTodo;




