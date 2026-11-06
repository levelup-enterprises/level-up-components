# TanStack Table Component Library

A TypeScript-first table component using TanStack Table under the hood. This library provides a clean, composable API for building complex tables.

## Installation

```bash
npm install @tanstack/react-table
```

## Usage

### Basic Table

```tsx
import { Table } from '@your-library/Table';

const columns = [
  { id: 'name', accessorKey: 'name', header: 'Name' },
  { id: 'email', accessorKey: 'email', header: 'Email' },
  { id: 'status', accessorKey: 'status', header: 'Status' },
];

const data = [
  { name: 'John', email: 'john@example.com', status: 'Active' },
  { name: 'Jane', email: 'jane@example.com', status: 'Inactive' },
];

<Table config={{ columns, data }} />
```

### With Row Click Handler

```tsx
<Table 
  config={{ columns, data }}
  rowClickHandler={(row) => console.log(row)}
/>
```

### With Sorting

```tsx
const [sortConfig, setSortConfig] = useState<Array<{
  id: string;
  accessorKey: string;
  sortDirection?: 'asc' | 'desc';
}>>([]);

<Table
  config={{ columns, data }}
  sortable={true}
  onSortChange={(columnId, direction) => {
    console.log(`Sorting by ${columnId}: ${direction}`);
  }}
/>
```

## Components

### Table
Base table component that renders the header and body. Accepts:
- `config`: Column and data configuration
- `className`: Tailwind class name override
- `rowClickHandler`: Callback when a row is clicked
- `sortable`: Enable/disable sorting (default: true)
- `sortConfig`: Initial sort direction per column

### Cell
Individual cell renderer for custom column formatting.

### Pagination
Pagination controls with page navigation.

### SortableHeader
Column header with clickable sort functionality. Accepts:
- `columnId`: Column identifier
- `columnHeader`: Display text
- `isSortable`: Whether sorting is enabled
- `sortConfig`: Sort state configuration
- `onSortChange`: Callback when column is clicked (asc -> desc -> none)

## Features Implemented

- ✅ Responsive table layout with Tailwind classes
- ✅ Row click handlers with proper accessibility
- ✅ Hover effects on rows
- ✅ **Sortable columns with arrow indicators**
- ✅ Previous/Next pagination navigation buttons
- ✅ Pagination with smart page number display (shows current ±10 pages)
- ✅ Current page highlighting
- ✅ Total row count display
- ✅ Column-specific styling

## How Sorting Works

Click a sortable column header to cycle through sort directions:
1. **First click**: Sort ascending (↑ icon appears)
2. **Second click**: Sort descending (↓ icon appears)
3. **Third click**: Toggle off (no icon)

Each column can have independent sort states. The sorting direction is visualized with SVG arrow icons in the header.

## Next Steps

We'll enhance this to:
1. Integrate TanStack Table v8+ features (sorting, filtering, pagination)
2. Add column type-specific renderers (text, number, date, select dropdown)
3. Add filtering capability
4. Add cell-level formatting functions

Let me know if you want to proceed with these enhancements!
