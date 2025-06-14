import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { CalendarDays, ListTodo, Plus, AlertCircle, Menu } from 'lucide-react';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-gray-800">
    
      <header className="flex justify-between items-center p-4 bg-purple-500 text-white md:hidden">
        <h1 className="text-xl font-bold">Todo App</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu size={24} />
        </button>
      </header>


      <aside
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block w-64 bg-purple-500 text-white flex flex-col p-4 shadow-lg`}
      >
        <h1 className="text-3xl font-bold mb-6 hidden md:block">Todo App</h1>

        <nav className="flex flex-col gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-purple-800 transition ${isActive ? 'bg-purple-500' : ''}`
            }
          >
            <ListTodo size={18} /> Todo List
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-purple-800 transition ${isActive ? 'bg-purple-500' : ''}`
            }
          >
            <Plus size={18} /> Add Todo
          </NavLink>

          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-purple-800 transition ${isActive ? 'bg-purple-500' : ''}`
            }
          >
            <CalendarDays size={18} /> Calendar View
          </NavLink>

          <NavLink
            to="/test-error"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-purple-800 transition ${isActive ? 'bg-purple-500' : ''}`
            }
          >
            <AlertCircle size={18} /> Trigger Error
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
