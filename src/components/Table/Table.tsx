import { twMerge } from 'tailwind-merge';
import React, { useState } from 'react';
import SortableHeader from './SortableHeader';
import Cell from './Cell';

export interface ColumnConfig {
  id: string;
  accessorKey: string;
  header: string;
}

export interface TableData {
  columns: ColumnConfig[];
  data: Array<Record<string, any>>;
  rowClassName?: (row: Record<string, any>) => string | undefined;
}

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  config: TableData;
  className?: string;
  rowClickHandler?: (row: Record<string, any>, rowIndex: number) => void;
  sortable?: boolean;
  sortConfig?: Array<{
    id: string;
    accessorKey: string;
    sortDirection?: 'asc' | 'desc';
  }>;
  onSortChange?: (columnId: string, direction: 'asc' | 'desc') => void;
}

export function Table({ 
  config, 
  className, 
  rowClickHandler, 
  sortable = true,
  sortConfig = [],
  onSortChange,
}: TableProps) {
  const { columns, data, rowClassName } = config;

  const styles = 'w-full border-collapse';
  const mergedClasses = twMerge(styles, className);

  // Handle sort direction state
  const [sortState, setSortState] = useState<{ [key: string]: 'asc' | 'desc' | null }>({});

  const handleSort = (columnId: string) => {
    const currentDirection = sortState[columnId];
    let newDirection: 'asc' | 'desc' | null;

    if (!currentDirection) {
      newDirection = 'asc';
    } else if (currentDirection === 'asc') {
      newDirection = 'desc';
    } else {
      newDirection = null; // Toggle off
    }

    setSortState(prev => ({ ...prev, [columnId]: newDirection as any }));
    onSortChange?.(columnId, newDirection as 'asc' | 'desc');
  };

  return (
    <table className={mergedClasses}>
      <thead>
        <tr>
          {columns.map((col) => (
            <SortableHeader
              key={col.id}
              columnId={col.id}
              columnHeader={col.header}
              isSortable={sortable}
              sortConfig={{ enabled: sortable, columns: sortConfig }}
              className={`hover:bg-gray-50 ${sortState[col.id] && ''}`}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={String(rowIndex)}
            className="border-b border-gray-200 hover:bg-gray-50"
            onClick={() => rowClickHandler?.(row, rowIndex)}
            role="button"
            tabIndex={rowClickHandler ? 0 : -1}
          >
            {columns.map((col) => (
              <Cell
                key={col.id}
                columnHeader={col.header}
                value={row[col.accessorKey]}
                className=""
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;