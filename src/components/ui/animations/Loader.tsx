
export const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-lg text-gray-500 mt-4">Loading...</p>
    </div>
  );
};
