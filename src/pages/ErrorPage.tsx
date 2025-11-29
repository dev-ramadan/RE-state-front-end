import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white rounded-lg shadow p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          An unexpected error occurred. You can reload the page or go back to the home page.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
          <Link to="/" className="px-4 py-2 rounded border">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
