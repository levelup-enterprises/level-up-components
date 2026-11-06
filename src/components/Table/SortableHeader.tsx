import { twMerge } from 'tailwind-merge';
import React, { useState, useEffect, useCallback } from 'react';

export interface SortConfig<T> {
  enabled: boolean;
  columns: Array<{
    id: string;
    accessorKey: string;
    sortDirection?: 'asc' | 'desc';
  }>;
  onSortChange?: (columnId: string, direction: 'asc' | 'desc') => void;
}

export interface SortableHeaderProps<T> {
  columnId: string;
  columnHeader: string;
  isSortable: boolean;
  sortConfig?: SortConfig<T>;
  className?: string;
}

export function SortableHeader<T extends { [key: string]: any }>({
  columnId,
  columnHeader,
  isSortable,
  sortConfig,
  className,
}: SortableHeaderProps<T>) {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  useEffect(() => {
    if (!isSortable) return;
    
    if (sortConfig?.enabled && sortConfig.columns.length > 0) {
      const col = sortConfig.columns.find(c => c.id === columnId);
      setSortDirection(col?.sortDirection || null);
    } else {
      setSortDirection(null);
    }
  }, [isSortable, columnId, sortConfig?.enabled]);

  const handleSortClick = useCallback(() => {
    if (!isSortable || !sortConfig) return;

    // Toggle: asc -> desc -> none
    let newDirection: 'asc' | 'desc' | null;

    if (sortDirection === null || sortDirection === 'asc') {
      newDirection = 'desc';
    } else if (sortDirection === 'desc') {
      newDirection = null; // Toggle off
    } else {
      newDirection = 'asc';
    }

    sortConfig.onSortChange?.(columnId, newDirection as 'asc' | 'desc');
  }, [isSortable, sortConfig, columnId, sortDirection]);

  const mergedClasses = twMerge('', className);

  if (!isSortable) {
    return (
      <th className="border-b border-gray-300 p-2 text-left align-middle font-medium whitespace-nowrap">
        {columnHeader}
      </th>
    );
  }

  return (
    <th
      onClick={handleSortClick}
      className={`border-b border-gray-300 p-2 text-left align-middle font-medium whitespace-nowrap cursor-pointer hover:bg-gray-50 ${mergedClasses}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSortClick();
        }
      }}
    >
      <span className="flex items-center gap-1">
        {columnHeader}
        {(sortDirection === 'asc' || sortDirection === 'desc') && (
          <svg
            className={`h-4 w-4 ${sortDirection === 'desc' ? '' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            {sortDirection === 'desc' && (
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 0 1 .59.29l4.865 4.865a.75.75 0 0 1-1.06 1.06L10 4.57l-4.395 4.395a.75.75 0 0 1-1.06-1.06L10 4.29V3zm3.19 10.793a.75.75 0 0 1 .29-.59l-4.865-4.865a.75.75 0 0 1 1.06-1.06L13.43 10 19 4.395a.75.75 0 0 1 1.06 1.06l-2.815 2.815a.75.75 0 0 1-.41.21L13.43 15H15v1.71a.75.75 0 0 1-1.21.62l-3.69-3.69z"
                clipRule="evenodd"
              />
            )}
            {sortDirection === 'asc' && (
              <path
                fillRule="evenodd"
                d="M10 17a.75.75 0 0 1-.59-.29L4.545 12.865a.75.75 0 0 1 1.06-1.06l4.395 4.395 4.395-4.395a.75.75 0 0 1 1.06 1.06L10.29 16.71V18h1.71a.75.75 0 0 1 .62 1.21l-3.69 3.69z"
                clipRule="evenodd"
              />
            )}
          </svg>
        )}
      </span>
    </th>
  );
}

export default SortableHeader;