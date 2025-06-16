import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";

export default function Layout() {
  return (
    <div role="main" className="p-4">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-4xl text-green-500 font-bold">Todo App</h1>
        <Button variant="danger">
          <Link 
          className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
          to="/test-error">Trigger Error</Link>
        </Button>
        <Button variant="ghost">
          <Link
            className=" text-white "
            to="/"
          >
            Home
          </Link>
        </Button>
      </header>
      <Outlet />
    </div>
  );
}
