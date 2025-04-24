import { useState } from "react";

export default function ProductHeader({
  totalItems,
  perPage,
  setPerPage,
  sortBy,
  setSortBy,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // Menghitung indeks awal dan akhir item
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-4">
      {/* Info jumlah item */}
      <div className="bg-white px-4 py-3 shadow-sm text-gray-600 text-sm w-full max-w-full lg:max-w-[1014px] text-left">
        <span className="text-[#DADADA]">
          Items {startItem}-{endItem} of {totalItems}
        </span>
      </div>

      {/* Filter & Sort */}
      <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
        {/* Sort By */}
        <div className="bg-[#F5F5F5] border-2 border-[#DADADA] px-4 py-3 text-sm flex justify-between items-center w-full sm:w-auto sm:min-w-[256px]">
          <span className="text-[#A2A6B0] font-medium mr-2">Sort By:</span>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-black font-semibold focus:outline-none w-full sm:w-auto"
          >
            <option value="none">None</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
