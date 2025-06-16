import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Layout() {
  return (
    <div role="main" className="p-4">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-4xl text-green-500 font-bold">Todo App</h1>
        <Button asChild>
          <Link 
          className="border border-gray-100 bg-red-600 text-white hover:bg-gray-800"
          to="/test-error">Trigger Error</Link>
        </Button>
        <Button asChild>
          <Link
            className="border border-gray-100 bg-gray-600 text-white hover:bg-gray-800"
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
