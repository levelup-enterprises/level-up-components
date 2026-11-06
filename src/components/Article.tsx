import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ArticleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function Article({ className, ...rest }: ArticleProps) {
  const mergedClassName = twMerge('', className);

  return (
    <article className={mergedClassName} {...rest}>
      {children}
    </article>
  );
}
