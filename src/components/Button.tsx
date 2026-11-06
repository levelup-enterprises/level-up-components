import React from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'primary' | 'secondary' | 'alert';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400',
  alert: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
};

export function Button({ 
  children, 
  className = '', 
  variant = 'primary',
  ...rest 
}: ButtonProps) {
  const mergedClassName = twMerge(
    'btn',
    variantClasses[variant],
    className
  );

  return (
    <button className={mergedClassName} {...rest}>
      {children}
    </button>
  );
}
