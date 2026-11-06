import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface TableCellProps {
  columnHeader: string;
  value?: any;
  className?: string;
  cellRenderer?: (value: any) => React.ReactNode;
}

export function Cell({ columnHeader, value, className, cellRenderer }: TableCellProps) {
  const baseClasses = 'whitespace-nowrap';
  const mergedClasses = twMerge(baseClasses, className);

  if (cellRenderer && typeof cellRenderer === 'function') {
    return <td className={mergedClasses}>{cellRenderer(value)}</td>;
  }

  return (
    <td className={mergedClasses}>
      {value != null ? String(value) : ''}
    </td>
  );
}

export default Cell;