import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages = 1, currentPage, onPageChange }) => {
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          onClick={() => goToPage(page)}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            page === currentPage
              ? "bg-[#F5F7FF] font-bold text-black"
              : "border-2 border-gray-400 text-gray-500"
          }`}
        >
          {page}
        </button>
      ) : (
        <span
          key={index}
          className="w-10 h-10 flex items-center justify-center text-gray-500"
        >
          {page}
        </span>
      )
    );
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-400 text-gray-500 disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-400 text-gray-500 disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
