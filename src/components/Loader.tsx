import { twMerge } from 'tailwind-merge';
import React, { ReactNode } from 'react';

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  loading: boolean;
  loadContent?: ReactNode;
  children?: ReactNode;
  className?: string;
}

function DefaultSpinner() {
  return (
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
  );
}

export function Loader({ loading, loadContent, children, className, }: LoaderProps) {
  const mergedClasses = twMerge('', className);

  if (!loading) {
    return <>{children}</>;
  }

  const content = loadContent ?? <DefaultSpinner />;

  return (
    <div
      className={`flex items-center justify-center min-h-[4rem] ${mergedClasses}`}
      role="status"
      aria-label="Loading"
    >
      {content}
    </div>
  );
}

export default Loader;