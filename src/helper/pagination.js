import React from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <div className="ms-auto">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          className="btn btn-light"
          disabled={currentPage === 1}
        >
          <MdArrowBack />
        </button>
        {generatePageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="mx-2">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`btn btn-light ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          className="btn btn-light"
          disabled={currentPage === totalPages}
        >
          <MdArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
