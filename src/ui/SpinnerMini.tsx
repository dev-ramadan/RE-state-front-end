function SpinnerMini() {
  return (
    <div
      className="inline-block size-6 border-2 border-current border-t-transparent text-blue-600 rounded-full animate-spin"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default SpinnerMini;
