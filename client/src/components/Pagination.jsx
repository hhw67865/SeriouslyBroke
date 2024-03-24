const Pagination = ({ setCurrentPage, currentPage, data, itemsPerPage }) => {
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1 text-black hover:bg-gray-200"
      >
        &#8592; Prev
      </button>
      <span className="text-sm text-gray-500">
        Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
      </span>
      <button
        onClick={nextPage}
        disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
        className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1 text-black hover:bg-gray-200"
      >
        Next &#8594;
      </button>
    </div>
  );
};
export default Pagination;
