function UnAuthorized() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-blue-50 text-center px-4">
      <div className="bg-white shadow-xl border border-blue-200 rounded-2xl p-10 max-w-md w-full">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4">401</h1>
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">Unauthorized Access</h2>
        <p className="text-blue-600 mb-6">You do not have permission to view this page.</p>

        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

export default UnAuthorized;
