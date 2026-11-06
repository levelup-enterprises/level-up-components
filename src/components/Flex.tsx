import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: 'row' | 'col';
}

export function Flex({ direction, className, children, ...rest }: FlexProps) {
  const mergedClassName = twMerge(
    'flex gap-2',
    direction === 'col' && 'flex-col',
    className
  );

  return (
    <div className={mergedClassName} {...rest}>
      {children}
    </div>
  );
}
