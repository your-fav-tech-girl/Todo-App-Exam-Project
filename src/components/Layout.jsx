import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";

export default function Layout() {
  return (
    <div role="main" className="p-4">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-4xl sm:items-center font-bold text-green-600">Todo App</h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <Button variant="danger" aschild="true">
            <Link to="/test-error">Trigger Error</Link>
          </Button>

          <Button variant="ghost" aschild="true">
            <Link to="/">Home</Link>
          </Button>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
