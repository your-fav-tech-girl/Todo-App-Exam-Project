import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TodoModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd(title);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
    <Link
    to="/"
    className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
     Home   
    </Link>
        <h2 className="text-xl font-semibold mb-4">New Todo</h2>
        
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter todo title"
          aria-label="New todo title"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-400"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
        
      </div>
      
    </div>
  );
}
