import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

export function Section({ className, ...rest }: SectionProps) {
  const mergedClassName = twMerge('', className);

  return (
    <section className={mergedClassName} {...rest}>
      {children}
    </section>
  );
}
