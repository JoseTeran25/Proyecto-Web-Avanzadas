
export const Paginacion = () => {
  return (
    <div className="mt-6 sm:flex sm:items-center sm:justify-between">
      <div className="text-sm text-gray-500">
        Page <span className="font-bold text-gray-700">1 of 10</span>
      </div>
      <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
        <a
          href="#"
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100"
        >
          <span>Previous</span>
        </a>
        <a
          href="#"
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100"
        >
          <span>Next</span>
        </a>
      </div>
    </div>
  )
}