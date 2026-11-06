import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string;
  className?: string;
  weight?: 'light' | 'normal' | 'bold';
  style?: 'italic' | 'normal';
}

// Map text type prefixes to HTML tags
const TAG_MAP: Record<string, React.ElementType<any>> = {
  P: 'p',
  S: 'span',
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
};

// Default text styles based on tag type (using Tailwind classes)
const getStylesForTag = (children?: string) => {
  const child = children?.toUpperCase();
  
  switch (child) {
    case 'H1': return 'text-4xl font-extrabold';
    case 'H2': return 'text-3xl font-bold';
    case 'H3': return 'text-2xl font-semibold';
    case 'H4': return 'text-xl font-semibold';
    case 'H5': return 'text-lg font-medium';
    case 'H6': return 'text-base font-medium';
    default: return 'text-base font-normal';
  }
};

// Helper to convert fontWeight prop value to Tailwind class
const getFontWeightClass = (fontWeight?: 'light' | 'normal' | 'bold'): string | null => {
  if (!fontWeight) return null;
  
  switch (fontWeight) {
    case 'light': return 'font-light';
    case 'bold': return 'font-bold';
    default: return 'font-normal';
  }
};

export function Text({ children, className, weight = 'normal', style = 'normal', ...rest }: TextProps) {

  const mergedClassName = twMerge(
    getStylesForTag(children),
    getFontWeightClass(weight),
    style === 'italic' && 'italic',
    className
  );

  // Determine the tag based on children type (e.g., 'P', 'S', 'H1')
  const Tag = TAG_MAP[children?.toUpperCase() as keyof typeof TAG_MAP] || 'p';

  return (
    <Tag className={mergedClassName} {...rest}>
      {children}
    </Tag>
  );
}
