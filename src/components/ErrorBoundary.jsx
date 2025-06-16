import { Component } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.replace("/");           
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white shadow rounded-lg p-6 space-y-4 text-center">
          <AlertTriangle className="mx-auto h-10 w-10 text-red-600" />
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-sm text-gray-500">
            {this.state.error?.message || "Unexpected application error."}
          </p>
          <Button onClick={this.handleReload}>Go back home</Button>
        </div>
      </div>
    );
  }
}
