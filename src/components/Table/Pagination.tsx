import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface PaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  rowCount: number;
  className?: string;
  onPageChange?: (page: number) => void;
}

const PAGE_DISPLAY_LIMIT = 10; // Show max 10 page numbers at once

export function Pagination({
  page,
  pageSize,
  totalPages,
  rowCount,
  className,
  onPageChange,
}: PaginationProps) {
  const mergedClasses = twMerge('', className);

  if (totalPages <= 1) return null;

  // Calculate visible pages around the current page
  const maxVisible = PAGE_DISPLAY_LIMIT;
  const startPage = Math.max(0, Math.floor(page / maxVisible));
  const endPage = Math.min(totalPages - 1, startPage + maxVisible - 1);

  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const currentOffset = page % maxVisible;
  const displayPages = pageNumbers.slice(currentOffset);
  const hasPrev = page > 0;
  const hasNext = page < totalPages - 1;

  const handlePageClick = (pageNum: number) => {
    if (onPageChange && pageNum >= 0 && pageNum < totalPages) {
      onPageChange(pageNum);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 p-2">
      {/* Previous button */}
      <button
        onClick={() => handlePageClick(page - 1)}
        disabled={!hasPrev}
        className="px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-200"
      >
        &larr; Prev
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {displayPages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageClick(pageNum)}
            className={`px-3 py-1 rounded ${
              pageNum === page
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-200'
            }`}
          >
            {pageNum + 1}
          </button>
        ))}

        {/* Show total pages if more than displayed */}
        {endPage < totalPages - 1 && (
          <>
            <span className="px-3 py-1">...</span>
            <button
              onClick={() => handlePageClick(totalPages - 1)}
              className="px-3 py-1 rounded hover:bg-gray-200"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next button */}
      <button
        onClick={() => handlePageClick(page + 1)}
        disabled={!hasNext}
        className="px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-200"
      >
        Next &rarr;
      </button>

      {/* Info */}
      <span className="text-sm text-gray-600">
        Page {page + 1} of {totalPages} ({rowCount} rows)
      </span>
    </div>
  );
}

export default Pagination;