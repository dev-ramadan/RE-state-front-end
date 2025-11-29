function Divider() {
  return (
    <div className="relative flex justify-center items-center py-2">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-gray-300"></span>
      </div>
      <div className="relative bg-white px-3 text-sm text-gray-500">OR</div>
    </div>
  );
}

export default Divider;
