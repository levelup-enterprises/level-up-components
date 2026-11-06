import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  children: React.ReactNode;
  weight?: 'light' | 'normal' | 'bold';
  style?: 'italic' | 'normal';
}

const TAG_MAP = {
  P: 'p',
  S: 'span',
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
} as const;

type TextVariant = keyof typeof TAG_MAP;

const TAG_STYLES: Record<TextVariant, string> = {
  P: 'text-base font-normal',
  S: 'text-base font-normal',
  H1: 'text-4xl font-extrabold',
  H2: 'text-3xl font-bold',
  H3: 'text-2xl font-semibold',
  H4: 'text-xl font-semibold',
  H5: 'text-lg font-medium',
  H6: 'text-base font-medium',
};

function renderText(variant: TextVariant, { children, className, weight, style = 'normal', ...rest }: TextProps) {
  const Tag = TAG_MAP[variant];
  const mergedClassName = twMerge(
    TAG_STYLES[variant],
    weight && `font-${weight}`,
    style === 'italic' && 'italic',
    className
  );

  return <Tag className={mergedClassName} {...rest}>{children}</Tag>;
}

function BaseText(props: TextProps) {
  const name = typeof props.children === 'string' ? props.children.toUpperCase() : '';
  const variant = Object.prototype.hasOwnProperty.call(TAG_MAP, name) ? name as TextVariant : 'P';
  return renderText(variant, { ...props, weight: props.weight ?? 'normal' });
}

function createVariant(variant: TextVariant) {
  return function TextVariantComponent(props: TextProps) {
    return renderText(variant, props);
  };
}

export const Text = Object.assign(BaseText, {
  P: createVariant('P'),
  S: createVariant('S'),
  H1: createVariant('H1'),
  H2: createVariant('H2'),
  H3: createVariant('H3'),
  H4: createVariant('H4'),
  H5: createVariant('H5'),
  H6: createVariant('H6'),
});
