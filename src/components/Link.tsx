import { twMerge } from 'tailwind-merge';
import React, { ReactNode } from 'react';
import { Link as RouterLink } from '@tanstack/react-router';

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  className?: string;
  to?: string;
  href?: string;
  children: ReactNode;
}

function DefaultHoverStyles() {
  return 'transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800';
}

export function Link({ className, to, href, children, ...rest }: LinkProps) {  
  if (href !== undefined) {
    const mergedClasses = twMerge('', className);
    
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center gap-2 text-sm font-medium ${DefaultHoverStyles()} ${mergedClasses}`}
        {...rest}
      >
        {children}
      </a>
    );
  }

  if (to) {    
    const mergedClasses = twMerge('', className);

    if (to.startsWith('#')) {
      return (
        <a
          href={to}
          className={`inline-flex items-center gap-2 text-sm font-medium ${DefaultHoverStyles()} ${mergedClasses}`}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <RouterLink
        to={to}
        className={`inline-flex items-center gap-2 text-sm font-medium ${DefaultHoverStyles()} ${mergedClasses}`}
        {...rest}
      >
        {children}
      </RouterLink>
    );
  }

  // Fallback to basic anchor for empty href/to (shouldn't happen with proper typing)
  return null;
}

export default Link;